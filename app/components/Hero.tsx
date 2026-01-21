import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 gradient-bg">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          매주 월요일,
          <br />
          <span className="animated-gradient">음악 수업</span>이 쉬워집니다
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          5분이면 충분합니다. 바로 쓸 수 있는 수업안과 최신 교육 트렌드를 이메일로 받아보세요.
        </p>
        
        <Link 
          href="/pricing"
          className="bg-white text-amber-800 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-2xl inline-block"
        >
          7일 무료 체험하기 →
        </Link>
        
        <p className="text-white/80 text-sm mt-6">
          ✓ 신용카드 등록 없음 &nbsp; ✓ 언제든 해지 가능
        </p>
      </div>
    </section>
  );
}
