// lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// 클라이언트용 (브라우저)
export const getStripe = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error('Stripe Publishable Key가 없습니다!');
  }
  return loadStripe(key);
};

// 서버용 (API) — 빌드 시점이 아니라 API 호출 시에만 초기화 (Vercel 빌드 시 env 없어도 빌드 통과)
let _stripe: Stripe | null = null;
export function getStripeServer(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY가 설정되지 않았습니다. Vercel 환경 변수를 확인하세요.');
    _stripe = new Stripe(key, { apiVersion: '2025-12-15.clover' });
  }
  return _stripe;
}
