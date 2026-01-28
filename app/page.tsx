'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MusicalSampleSection from './components/MusicalSampleSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';

// useSearchParams를 사용하는 컴포넌트를 분리
function WelcomeModal() {
  const searchParams = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(false);

  // URL에 ?subscribed=true 있으면 축하 모달 표시
  useEffect(() => {
    if (searchParams.get('subscribed') === 'true') {
      setShowWelcome(true);
      // URL에서 파라미터 제거 (히스토리 깔끔하게)
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          구독을 환영합니다!
        </h2>
        <p className="text-gray-600 mb-6">
          매주 음악 수업에 도움되는 아이디어와<br />
          교육 트렌드를 보내드릴게요!
        </p>
        <div className="bg-amber-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-[#2C3E50]">
            📬 첫 번째 뉴스레터가 곧 발송됩니다.<br />
            <strong>스팸함도 확인해주세요!</strong>
          </p>
        </div>
        <button
          onClick={() => setShowWelcome(false)}
          className="w-full bg-[#2C3E50] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1A252F] transition"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* 🎉 구독 완료 축하 모달 - Suspense로 감싸서 useSearchParams 오류 방지 */}
      <Suspense fallback={null}>
        <WelcomeModal />
      </Suspense>
      <Navbar />
      <Hero />
      <MusicalSampleSection />
      <ReviewsSection />
      <FAQSection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 rounded-t-[200px]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="mb-4 flex justify-center">
              <Image src="/2.png" alt="harmonyclass" width={320} height={112} className="h-28 w-auto object-contain" />
            </div>
            <p className="text-gray-400">음악 교사를 위한 수업 아이디어 뉴스레터</p>
          </div>
          
          <div className="mb-6 text-sm text-gray-400">
            <p>contact@harmonyclass.com</p>
            <p className="mt-1">카카오톡: @harmonyclass</p>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-sm text-gray-500">
            <p>© 2026 harmonyclass. All rights reserved.</p>
            <p className="mt-2">Made with love for Music Teachers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
