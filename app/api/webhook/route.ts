// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
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
    const email = session.metadata?.email;

    if (email) {
      console.log('✅ 결제 성공! 프리미엄 전환:', email);

      // 🎯 자동으로 프리미엄 전환!
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
        .eq('email', email);

      if (error) {
        console.error('DB 업데이트 오류:', error);
      } else {
        console.log('✨ 프리미엄 전환 완료!');
      }
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
    }
  }

  return NextResponse.json({ received: true });
}
