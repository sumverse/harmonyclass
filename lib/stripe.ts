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

// 서버용 (API) — stripe 패키지 타입에 맞는 버전 사용
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});
