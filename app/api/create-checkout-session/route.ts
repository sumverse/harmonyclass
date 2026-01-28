// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, userId } = await req.json();

    // Stripe Checkout 세션 생성
    const session = await getStripeServer().checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'krw',
            product_data: {
              name: 'harmonyclass Premium',
              description: '음악 교사를 위한 프리미엄 구독',
            },
            unit_amount: 9900, // 9,900원
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        email,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url ?? null,
    });
  } catch (error: any) {
    console.error('Stripe 세션 생성 오류:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
