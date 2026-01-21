import Link from 'next/link';

export default function PricingSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          자신에게 맞는 요금제를 선택하세요
        </h2>
        <p className="text-gray-600 text-center mb-12 text-lg">
          7일 무료 체험 후 자동 결제
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 무료 플랜 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">무료</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">₩0</span>
              <span className="text-gray-600">/월</span>
            </div>
            <p className="text-gray-600 mb-6">
              기본 수업 아이디어만 필요하신 분
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-700">수업 1차시</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-700">교육 트렌드 분석</span>
              </li>
            </ul>
            <Link 
              href="/pricing"
              className="block w-full text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              무료로 시작하기
            </Link>
          </div>

          {/* 프리미엄 플랜 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg border-2 border-amber-300 relative">
            <div className="absolute -top-4 right-8 bg-amber-800 text-white px-4 py-1 rounded-full text-sm font-bold">
              추천
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">프리미엄</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">₩9,900</span>
              <span className="text-gray-600">/월</span>
            </div>
            <p className="text-gray-600 mb-6">
              완벽한 수업 준비가 필요하신 분
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">전체 차시 수업</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">악보, 운지표, 활동지 PDF</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">평가 루브릭</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-gray-900 font-medium">지역별 공연 정보</span>
              </li>
            </ul>
            <Link 
              href="/pricing"
              className="block w-full text-center bg-amber-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-900 transition shadow-lg"
            >
              프리미엄 시작하기
            </Link>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          <Link href="/pricing" className="underline hover:text-gray-700">
            자세한 혜택 비교 보기 →
          </Link>
        </p>
      </div>
    </section>
  );
}
