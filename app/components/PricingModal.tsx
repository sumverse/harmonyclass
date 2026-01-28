'use client';

import { useEffect } from 'react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSelectPlan = (plan: 'free' | 'premium') => {
    onClose();
    
    if (plan === 'free') {
      alert('🎉 무료 구독을 선택하셨습니다!\n\n이메일을 입력하시면 다음 월요일부터 뉴스레터를 받으실 수 있습니다.');
    } else {
      alert('🎉 프리미엄 구독을 선택하셨습니다!\n\n결제 페이지로 이동합니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`modal ${isOpen ? 'active' : ''}`}
      onClick={onClose}
    >
      <div 
        className="modal-content p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">요금제 선택</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <p className="text-gray-600 text-center mb-10 text-lg">
          자신에게 맞는 요금제를 선택하세요
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="pricing-card bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-amber-300">
            <div className="text-center mb-6">
              <div className="inline-block bg-gray-100 px-4 py-1 rounded-full text-sm font-semibold text-gray-700 mb-4">
                무료
              </div>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">₩0</span>
                <span className="text-gray-500">/월</span>
              </div>
              <p className="text-gray-600">기본 수업 아이디어만 필요하신 분</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-700">수업 1차시</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-700">교육 트렌드 분석</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <svg className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span className="text-gray-400">전체 차시 수업</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <svg className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span className="text-gray-400">악보 PDF</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <svg className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span className="text-gray-400">운지표, 평가 루브릭, 활동지 PDF</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <svg className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span className="text-gray-400">연계 차시 계획서</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <svg className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span className="text-gray-400">과거 뉴스레터 전체 열람</span>
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <svg className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span className="text-gray-400">지역별 공연 정보</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handleSelectPlan('free')}
              className="w-full bg-gray-100 text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition"
            >
              무료로 시작하기
            </button>
          </div>
          
          {/* Premium Plan */}
          <div className="pricing-card premium bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-[#2C3E50] text-white px-3 py-1 rounded-full text-xs font-bold">
                추천
              </span>
            </div>
            
            <div className="text-center mb-6">
              <div className="inline-block bg-[#2C3E50] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                프리미엄
              </div>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">₩9,900</span>
                <span className="text-gray-600">/월</span>
              </div>
              <p className="text-gray-700">모든 수업 자료가 필요하신 분</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">무료 플랜의 모든 혜택</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">전체 차시 수업</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">악보 PDF (편곡본)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">운지표 (칼라/흑백)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">평가 루브릭</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">활동지 PDF</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">연계 차시 계획서</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">과거 뉴스레터 전체 열람</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#2C3E50] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">지역별 공연 정보</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handleSelectPlan('premium')}
              className="w-full bg-[#2C3E50] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1A252F] transition shadow-lg"
            >
              프리미엄 시작하기
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>✅ 신용카드 등록 불필요 (무료)</p>
          <p>✅언제든 구독 해지 가능</p>
        </div>
      </div>
    </div>
  );
}
