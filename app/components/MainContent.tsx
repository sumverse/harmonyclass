import Link from 'next/link';

export default function MainContent() {
  return (
    <>
      {/* Problem & Solution Section */}
      <section id="intro" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            이런 고민, 하시나요?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="bg-red-50 p-8 rounded-2xl card-hover">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">시간이 부족해요</h3>
              <p className="text-gray-600">매주 수업 준비에 3-4시간씩 걸려요</p>
            </div>
            
            <div className="bg-orange-50 p-8 rounded-2xl card-hover">
              <div className="text-4xl mb-4">😔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">자료 찾기 힘들어요</h3>
              <p className="text-gray-600">여러 사이트를 돌아다니며 찾아야 해요</p>
            </div>
            
            <div className="bg-yellow-50 p-8 rounded-2xl card-hover">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">트렌드를 놓쳐요</h3>
              <p className="text-gray-600">최신 교육 동향을 알기 어려워요</p>
            </div>
          </div>
          
          {/* Solution */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              harmonyclass가 해결해드려요
            </h2>
            <p className="text-gray-600 text-lg">
              매주 월요일, 단 5분만 투자하세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm card-hover border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">바로 쓸 수 있는 수업안</h3>
              <p className="text-gray-600">40분 수업 흐름, 준비물, 학생 반응까지 상세하게 제공해요</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm card-hover border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">공공 API 기반 트렌드</h3>
              <p className="text-gray-600">KOSIS 교육통계로 최신 동향을 분석해 전달해요</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm card-hover border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">초등/중등 맞춤 콘텐츠</h3>
              <p className="text-gray-600">학교급에 맞는 수업 아이디어만 골라서 받아보세요</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm card-hover border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">지역 공연 정보</h3>
              <p className="text-gray-600">문화포털 API로 현장 학습 기회를 추천해드려요</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
