// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { addSubscriber, removeFromGroup, STIBEE_GROUPS } from '@/lib/stibee';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  // 빌드 시점이 아니라 API 호출 시에만 생성 (Vercel 빌드 시 supabaseKey 에러 방지)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let event: Stripe.Event;

  try {
    event = getStripeServer().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook 서명 검증 실패:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // 결제 성공 시 처리
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const email = session.metadata?.email;

    if (userId) {
      console.log('✅ 결제 성공! 프리미엄 전환:', userId, email);

      // 🎯 profiles는 Supabase 기본처럼 id(auth.users.id) 기준. userId로 업데이트
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'active',
          subscription_tier: 'premium',
          subscription_start_date: new Date().toISOString(),
          subscription_end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
        })
        .eq('id', userId);

      if (error) {
        console.error('DB 업데이트 오류:', error);
      } else {
        console.log('✨ 프리미엄 전환 완료!');
        
        // 🔗 Stibee 프리미엄 그룹에 자동 추가
        if (email && process.env.STIBEE_API_KEY) {
          try {
            const groupIds = STIBEE_GROUPS.PREMIUM ? [STIBEE_GROUPS.PREMIUM] : [];
            await addSubscriber(email, undefined, groupIds);
            
            // DB에도 뉴스레터 구독 상태 업데이트
            await supabase
              .from('profiles')
              .update({
                newsletter_subscribed: true,
                newsletter_tier: 'premium',
                stibee_synced_at: new Date().toISOString(),
              })
              .eq('id', userId);
              
            console.log('📧 Stibee 프리미엄 그룹 등록 완료:', email);
          } catch (stibeeError) {
            console.error('Stibee 연동 오류:', stibeeError);
            // Stibee 오류는 결제 성공에 영향 주지 않음
          }
        }
      }
    } else {
      console.warn('checkout.session.completed: metadata.userId 없음', { email });
    }
  }

  // 구독 취소 시 처리
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    // stripe_customer_id로 사용자 찾아서 구독 취소
    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'cancelled',
        subscription_tier: 'free',
      })
      .eq('stripe_customer_id', customerId);

    if (error) {
      console.error('구독 취소 처리 오류:', error);
    } else {
      console.log('🔴 구독 취소됨');
      
      // 🔗 Stibee 프리미엄 → 무료 그룹으로 다운그레이드
      if (process.env.STIBEE_API_KEY) {
        try {
          // 해당 고객의 이메일 찾기
          const { data: profile } = await supabase
            .from('profiles')
            .select('email')
            .eq('stripe_customer_id', customerId)
            .single();
          
          if (profile?.email) {
            // 무료 그룹으로 변경 (프리미엄에서 제거)
            if (STIBEE_GROUPS.PREMIUM) {
              await removeFromGroup(STIBEE_GROUPS.PREMIUM, [profile.email]);
            }
            const groupIds = STIBEE_GROUPS.FREE ? [STIBEE_GROUPS.FREE] : [];
            await addSubscriber(profile.email, undefined, groupIds);
            
            // DB 업데이트
            await supabase
              .from('profiles')
              .update({
                newsletter_tier: 'free',
                stibee_synced_at: new Date().toISOString(),
              })
              .eq('stripe_customer_id', customerId);
              
            console.log('📧 Stibee 무료 그룹으로 다운그레이드:', profile.email);
          }
        } catch (stibeeError) {
          console.error('Stibee 다운그레이드 오류:', stibeeError);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
