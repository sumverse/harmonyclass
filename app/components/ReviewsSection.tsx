'use client';

import { useState, useEffect } from 'react';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      text: "매주 최신 교육 트렌드를 반영한 수업이 제공돼서 뒤처지지 않아요",
      author: "김민지 선생님",
      school: "중학교"
    },
    {
      id: 2,
      text: "에듀테크 활용 수업이 다양해서 학생들 반응이 정말 좋아요!",
      author: "박준호 선생님",
      school: "고등학교"
    },
    {
      id: 3,
      text: "수업 목표가 명확하고 학생 반응별 대응 예시까지 있어서 실전에 강해요",
      author: "이서연 선생님",
      school: "중학교"
    },
    {
      id: 4,
      text: "루브릭이 너무 꼼꼼해서 그대로 출력해서 바로 사용하고 있어요",
      author: "최영수 선생님",
      school: "중학교"
    },
    {
      id: 5,
      text: "다양한 학교급, 주제의 수업이 있어서 선택의 폭이 넓어요",
      author: "정하은 선생님",
      school: "고등학교"
    },
    {
      id: 6,
      text: "수업 흐름이 체계적이고 준비물, 유의사항까지 다 나와있어요",
      author: "강민석 선생님",
      school: "중학교"
    },
    {
      id: 7,
      text: "AI, 메타버스 등 최신 에듀테크를 수업에 자연스럽게 녹여낼 수 있어요",
      author: "윤지아 선생님",
      school: "고등학교"
    },
    {
      id: 8,
      text: "학생 수준별 활동 예시가 있어서 차별화 수업이 가능해요",
      author: "한도윤 선생님",
      school: "중학교"
    },
    {
      id: 9,
      text: "매주 기다려지는 뉴스레터! 동료 선생님들께 강력 추천합니다",
      author: "송지우 선생님",
      school: "고등학교"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // 무한 루프를 위해 앞뒤로 복사본 추가
  const getVisibleReviews = () => {
    const extended = [...reviews, ...reviews, ...reviews];
    const startIndex = currentIndex + reviews.length;
    return extended.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-title text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          선생님들의 이야기
        </h2>
        <p className="text-gray-600 text-center mb-12 text-lg">
          harmonyclass를 사용하는 선생님들의 솔직한 후기
        </p>

        <div className="relative">
          {/* 리뷰 카드 컨테이너 */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex % reviews.length) * (100 / 3)}%)`
              }}
            >
              {[...reviews, ...reviews, ...reviews].map((review, index) => (
                <div 
                  key={`${review.id}-${index}`}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] bg-amber-50 p-8 rounded-2xl shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed min-h-[80px]">
                    "{review.text}"
                  </p>
                  <div className="border-t border-amber-200 pt-4">
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-sm text-gray-600">{review.school} 음악교사</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex % reviews.length ? 'bg-amber-800 w-8' : 'bg-gray-300 w-2'
                }`}
                aria-label={`슬라이드 ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
