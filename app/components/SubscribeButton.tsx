// components/SubscribeButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SubscribeButtonProps {
  email: string;
  userId: string;
}

export default function SubscribeButton({ email, userId }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      // 1. 결제 세션 생성
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userId }),
      });

      const { sessionId, url, error } = await response.json();

      if (error) {
        alert('결제 세션 생성 실패: ' + error);
        setLoading(false);
        return;
      }

      // 2. Stripe Checkout으로 이동 (session.url 사용 — redirectToCheckout는 더 이상 사용 불가)
      if (!url) {
        alert('결제 URL을 받지 못했습니다.');
        setLoading(false);
        return;
      }
      window.location.href = url;
    } catch (err) {
      console.error('구독 오류:', err);
      alert('구독 처리 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="bg-[#2C3E50] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1A252F] transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? '처리 중...' : '프리미엄 구독하기'}
    </button>
  );
}
