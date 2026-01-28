export default function FAQSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-title text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
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
              7일 무료 체험 후 자동 결제됩니다. 체험 기간 동안 언제든 해지 가능합니다.
            </p>
          </details>
          
          <details className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition cursor-pointer">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              학교급/지역 선택/변경은 어떻게 하나요?
            </summary>
            <p className="mt-4 text-gray-600 pl-4 border-l-4 border-amber-200">
              구독 신청 시 초등/중등/고등과 지역을 선택하시면 되며, 이후 변경도 가능합니다.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
