import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { addSubscriber, removeSubscriber, getSubscriber, STIBEE_GROUPS } from '@/lib/stibee';

// Supabase Admin 클라이언트 (서버 사이드)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, userId, action, tier } = body;

    if (!email) {
      return NextResponse.json(
        { error: '이메일이 필요합니다.' },
        { status: 400 }
      );
    }

    // action: 'subscribe' | 'unsubscribe' | 'upgrade' | 'downgrade'
    switch (action) {
      case 'subscribe': {
        // 무료 뉴스레터 구독
        const groupIds = STIBEE_GROUPS.FREE ? [STIBEE_GROUPS.FREE] : [];
        const result = await addSubscriber(email, undefined, groupIds);
        
        // Supabase에 구독 상태 저장
        if (userId) {
          await supabaseAdmin
            .from('profiles')
            .upsert({
              id: userId,
              email,
              newsletter_subscribed: true,
              newsletter_tier: 'free',
              stibee_synced_at: new Date().toISOString(),
            }, { onConflict: 'id' });
        }
        
        return NextResponse.json({ success: true, result });
      }

      case 'unsubscribe': {
        // 뉴스레터 구독 취소
        const result = await removeSubscriber(email);
        
        // Supabase 업데이트
        if (userId) {
          await supabaseAdmin
            .from('profiles')
            .update({
              newsletter_subscribed: false,
              newsletter_tier: null,
              stibee_synced_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
        
        return NextResponse.json({ success: true, result });
      }

      case 'upgrade': {
        // 프리미엄으로 업그레이드 (Stripe 결제 후 호출)
        const groupIds = STIBEE_GROUPS.PREMIUM ? [STIBEE_GROUPS.PREMIUM] : [];
        const result = await addSubscriber(email, undefined, groupIds);
        
        if (userId) {
          await supabaseAdmin
            .from('profiles')
            .update({
              newsletter_subscribed: true,
              newsletter_tier: 'premium',
              stibee_synced_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
        
        return NextResponse.json({ success: true, result });
      }

      case 'downgrade': {
        // 무료로 다운그레이드
        const groupIds = STIBEE_GROUPS.FREE ? [STIBEE_GROUPS.FREE] : [];
        const result = await addSubscriber(email, undefined, groupIds);
        
        if (userId) {
          await supabaseAdmin
            .from('profiles')
            .update({
              newsletter_tier: 'free',
              stibee_synced_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
        
        return NextResponse.json({ success: true, result });
      }

      case 'status': {
        // 구독 상태 확인
        const result = await getSubscriber(email);
        return NextResponse.json({ success: true, result });
      }

      default:
        return NextResponse.json(
          { error: '유효하지 않은 action입니다.' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Stibee API 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Stibee 연동 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 구독 상태 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: '이메일이 필요합니다.' },
        { status: 400 }
      );
    }

    const result = await getSubscriber(email);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Stibee API 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '구독 상태 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

