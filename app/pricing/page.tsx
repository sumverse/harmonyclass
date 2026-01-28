'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../components/Navbar';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PricingPage() {
  const router = useRouter();
  const [schoolLevel, setSchoolLevel] = useState('elementary');
  const [region, setRegion] = useState('seoul');
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 무료 구독하기 버튼 클릭 핸들러
  const handleFreeSubscribe = async () => {
    // 로그인 상태 확인
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // 로그인 안 됨 → 로그인 모달 표시
      setShowLoginModal(true);
      return;
    }
    
    // 로그인 됨 → MailerLite 팝업 띄우기
    if (typeof window !== 'undefined' && (window as any).ml) {
      (window as any).ml('show', 'V8CClE', true);
    }
  };

  // 🎯 결제 시작 함수
  const handleStartPremium = async () => {
    setLoading(true);
    
    try {
      // 1. 로그인 확인
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('로그인이 필요합니다!');
        router.push('/login');
        return;
      }

      // 2. Stripe Checkout 세션 생성
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          userId: user.id,
          schoolLevel,
          region,
        }),
      });

      const { sessionId, url, error } = await response.json();

      if (error) {
        alert('오류가 발생했습니다: ' + error);
        return;
      }

      // 3. Stripe Checkout으로 리다이렉트 (session.url 사용 — redirectToCheckout는 더 이상 사용 불가)
      if (!url) {
        alert('결제 URL을 받지 못했습니다.');
        return;
      }
      window.location.href = url;
    } catch (error: any) {
      console.error('결제 오류:', error);
      alert('결제 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar alwaysWhite />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-40 pb-16">
        <div className="text-center mb-12">
          <h1 className="font-title text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            요금제 선택
          </h1>
          <p className="font-title text-gray-600 text-lg">
            언제든 해지 가능
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* 무료 플랜 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">무료</h2>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">₩0</span>
              <span className="text-gray-600 text-xl">/월</span>
            </div>
            <p className="text-gray-600 mb-8">
              기본 수업 아이디어만 필요하신 분
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">수업 1차시</p>
                  <p className="text-sm text-gray-600">주간 수업 아이디어 제공</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">교육 트렌드 분석</p>
                  <p className="text-sm text-gray-600">최신 교육 동향 정보</p>
                </div>
              </li>
              <li className="flex items-start gap-3 opacity-50">
                <svg className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-400">전체 차시 수업</p>
                </div>
              </li>
              <li className="flex items-start gap-3 opacity-50">
                <svg className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-400">악보, 운지표, 활동지 PDF</p>
                </div>
              </li>
            </ul>

            <button
              onClick={handleFreeSubscribe}
              className="w-full bg-gray-100 text-gray-900 px-6 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition"
            >
              무료로 시작하기
            </button>
          </div>

          {/* 프리미엄 플랜 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-xl border-2 border-amber-300 relative">
            <div className="absolute -top-4 right-8 bg-[#2C3E50] text-white px-6 py-2 rounded-full text-sm font-bold">
              추천
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">프리미엄</h2>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">₩9,900</span>
              <span className="text-gray-600 text-xl">/월</span>
            </div>
            <p className="text-gray-600 mb-8">
              완벽한 수업 준비가 필요하신 분
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">무료 플랜의 모든 혜택</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">전체 차시 수업</p>
                  <p className="text-sm text-gray-700">완성된 수업 전체 제공</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">악보 PDF (편곡본)</p>
                  <p className="text-sm text-gray-700">바로 인쇄 가능</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">운지표 (칼라/흑백)</p>
                  <p className="text-sm text-gray-700">학생 배부용</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">평가 루브릭</p>
                  <p className="text-sm text-gray-700">상세한 평가 기준표</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">활동지 PDF</p>
                  <p className="text-sm text-gray-700">학생 활동 자료</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">연계 차시 계획서</p>
                  <p className="text-sm text-gray-700">전체 흐름 한눈에</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">과거 뉴스레터 전체 열람</p>
                  <p className="text-sm text-gray-700">아카이브 무제한 접근</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">지역별 공연 정보</p>
                  <p className="text-sm text-gray-700">현장 학습 기회</p>
                </div>
              </li>
            </ul>

            {/* 선택 폼 */}
            <div className="bg-white p-6 rounded-xl mb-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  학교급 선택
                </label>
                <select 
                  value={schoolLevel}
                  onChange={(e) => setSchoolLevel(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                >
                  <option value="elementary">초등학교</option>
                  <option value="middle">중학교</option>
                  <option value="high">고등학교</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  지역 선택
                </label>
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                >
                  <option value="seoul">서울</option>
                  <option value="gyeonggi">경기</option>
                  <option value="incheon">인천</option>
                  <option value="busan">부산</option>
                  <option value="daegu">대구</option>
                  <option value="gwangju">광주</option>
                  <option value="daejeon">대전</option>
                  <option value="ulsan">울산</option>
                  <option value="sejong">세종</option>
                  <option value="gangwon">강원</option>
                  <option value="chungbuk">충북</option>
                  <option value="chungnam">충남</option>
                  <option value="jeonbuk">전북</option>
                  <option value="jeonnam">전남</option>
                  <option value="gyeongbuk">경북</option>
                  <option value="gyeongnam">경남</option>
                  <option value="jeju">제주</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleStartPremium}
              disabled={loading}
              className="w-full bg-[#2C3E50] text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#1A252F] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '처리 중...' : '프리미엄 시작하기'}
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-title text-3xl font-bold text-gray-900 mb-8 text-center">
            자주 묻는 질문
          </h2>
          
          <div className="space-y-4">
            <details className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                무료 버전과 유료 버전의 차이는 무엇인가요?
              </summary>
              <div className="mt-4 text-gray-600 pl-4 border-l-4 border-amber-200">
                <p className="mb-3"><strong className="text-gray-900">무료 버전:</strong> 수업 1차시와 교육 트렌드 제공</p>
                <p className="mb-3"><strong className="text-gray-900">프리미엄 버전:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>전체 차시 수업</li>
                  <li>악보 PDF</li>
                  <li>운지표 (칼라/흑백)</li>
                  <li>평가 루브릭</li>
                  <li>활동지 PDF</li>
                  <li>연계 차시 계획서</li>
                  <li>과거 뉴스레터 전체 열람</li>
                  <li>지역별 공연 정보</li>
                </ul>
                <p className="mt-3 text-sm">초등/중등/고등 모두 가능하며, 구독 신청 시 학교급과 지역을 선택하실 수 있습니다.</p>
              </div>
            </details>
            
            <details className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                어떤 형식으로 받나요?
              </summary>
              <p className="mt-4 text-gray-600 pl-4 border-l-4 border-amber-200">
                이메일로 받으시며, 프리미엄 회원은 첨부파일(PDF, 악보 등)도 함께 제공됩니다.
              </p>
            </details>
            
            <details className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                환불 정책은 어떻게 되나요?
              </summary>
              <p className="mt-4 text-gray-600 pl-4 border-l-4 border-amber-200">
                구독 후 언제든 해지 가능하며, 해지 시 다음 결제일부터 청구되지 않습니다.
              </p>
            </details>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 rounded-t-[200px] mt-20">
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
          </div>
        </div>
      </footer>

      {/* 로그인 필요 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              로그인이 필요합니다
            </h2>
            <p className="text-gray-600 mb-6">
              무료 뉴스레터를 구독하려면<br />
              먼저 로그인해주세요!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                취소
              </button>
              <button
                onClick={() => router.push('/login')}
                className="flex-1 px-4 py-3 bg-[#2C3E50] text-white rounded-xl font-semibold hover:bg-[#1A252F] transition"
              >
                로그인
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              아직 계정이 없으신가요?{' '}
              <button 
                onClick={() => router.push('/signup')}
                className="text-[#2C3E50] font-semibold hover:underline"
              >
                회원가입
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
