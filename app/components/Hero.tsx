'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const sections = [
  {
    id: 1,
    type: 'hero',
    title: "매주 월요일,\n음악 수업이 쉬워집니다",
    description: "5분이면 충분합니다. 바로 쓸 수 있는 수업안과 최신 교육 트렌드를 이메일로 받아보세요.",
    showCTA: true,
    showPixelRoom: true
  },
  {
    id: 2,
    type: 'problems',
    title: "음악 교사의 현실",
    items: [
      "2022 교육과정 기반 학년별 수업안 준비",
      "디지털 리터러시 교육 의무화, 준비 부족",
      "수업 설계보다 자료 검색에 소요되는 시간"
    ]
  },
  {
    id: 3,
    type: 'transition',
    title: "필요한 것은\n체계적으로 설계된 수업 솔루션입니다"
  },
  {
    id: 4,
    type: 'solution',
    title: "harmonyclass가 제공하는 것",
    items: [
      "2022 교육과정 기반 성취기준 반영 수업안 제공",
      "에듀테크 활용 수업 설계 (AI, 메타버스)",
      "KOSIS 교육통계 기반 트렌드 분석",
      "수행평가 연계 음악 수업 설계"
    ]
  },
  {
    id: 5,
    type: 'cta',
    title: "7일 무료 체험",
    showCTA: true
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const sectionIndex = Math.min(
        Math.floor(latest * sections.length),
        sections.length - 1
      );
      setCurrentSection(sectionIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${sections.length * 60}vh` }}>
      {/* 고정된 컨텐츠 */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: currentSection === index ? 1 : 0,
              scale: currentSection === index ? 1 : 0.95,
              y: currentSection === index ? 0 : 30
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* 배경 설정 */}
            {section.showPixelRoom && (
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: '#FFFACD'
                }}
              />
            )}

            {!section.showPixelRoom && (
              <div className={`absolute inset-0 ${
                section.type === 'solution' ? 'bg-gradient-to-br from-gray-50 to-blue-50' :
                section.type === 'transition' ? 'bg-gradient-to-br from-white to-gray-50' :
                section.type === 'problems' ? 'bg-[#FFFACD]' :
                'bg-gradient-to-br from-amber-50 to-orange-50'
              }`}></div>
            )}

            {/* 콘텐츠 */}
            <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
              {/* 제목 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: currentSection === index ? 1 : 0,
                  y: currentSection === index ? 0 : 20
                }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`font-bold mb-8 leading-tight whitespace-pre-line ${
                  section.type === 'problems' ? 'text-3xl md:text-5xl text-gray-900' :
                  section.type === 'solution' ? 'text-3xl md:text-5xl text-gray-900' :
                  section.type === 'cta' ? 'text-3xl md:text-5xl text-gray-900' :
                  'text-3xl md:text-5xl text-gray-900'
                }`}
              >
                {section.title}
              </motion.h1>

              {/* 설명 (Hero만) */}
              {section.description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSection === index ? 1 : 0,
                    y: currentSection === index ? 0 : 20
                  }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-lg md:text-xl text-white/95 mb-12 max-w-2xl mx-auto drop-shadow-lg"
                >
                  {section.description}
                </motion.p>
              )}

              {/* 리스트 (문제점, 솔루션) */}
              {section.items && (
                <motion.div
                  initial="hidden"
                  animate={currentSection === index ? "visible" : "hidden"}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3
                      }
                    }
                  }}
                  className={`space-y-4 mb-12 ${
                    section.type === 'solution' ? 'grid md:grid-cols-2 gap-6 space-y-0' : 'max-w-3xl mx-auto'
                  }`}
                >
                  {section.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        section.type === 'solution' 
                          ? 'bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left'
                          : 'flex items-start gap-3 p-5 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm'
                      }`}
                    >
                      <span className={`${
                        section.type === 'solution' 
                          ? 'text-amber-800 font-bold text-lg'
                          : 'text-gray-700 font-medium'
                      }`}>
                        •
                      </span>
                      <p className={`${
                        section.type === 'solution' 
                          ? 'text-gray-800 font-medium'
                          : 'text-gray-800 text-lg'
                      }`}>
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* CTA 버튼 */}
              {section.showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSection === index ? 1 : 0,
                    y: currentSection === index ? 0 : 20
                  }}
                  transition={{ duration: 0.4, delay: section.description ? 0.4 : 0.6 }}
                  className="space-y-4"
                >
                  <Link 
                    href="/pricing"
                    className="inline-block bg-amber-800 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-amber-900 transition shadow-2xl"
                  >
                    7일 무료 체험하기 →
                  </Link>
                  
                  <p className="text-gray-600 text-sm mt-4">
                    ✓ 신용카드 등록 없음 &nbsp; ✓ 언제든 해지 가능
                  </p>
                </motion.div>
              )}

              {/* 스크롤 힌트 (첫 화면에만) */}
              {index === 0 && currentSection === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-gray-600"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                  </motion.div>
                  <p className="text-sm text-gray-600 mt-2">스크롤해보세요</p>
                </motion.div>
              )}
            </div>

            {/* 픽셀 캐릭터들 (첫 화면에만) */}
            {section.showPixelRoom && currentSection === 0 && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* 피아노 치는 여학생 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute bottom-[15%] left-[8%]"
                >
                  <Image
                    src="/pixel_piano_girl_v2.png"
                    alt="Piano girl"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 드럼 학생 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                  className="absolute bottom-[15%] right-[8%]"
                >
                  <Image
                    src="/pixel_drum_boy_v2.png"
                    alt="Drum boy"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 선생님 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-[20%] left-[12%]"
                >
                  <Image
                    src="/pixel_female_music_teacher_v3.png"
                    alt="Music teacher"
                    width={120}
                    height={120}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 책 읽는 학생 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut", delay: 0.1 }}
                  className="absolute bottom-[25%] left-[25%]"
                >
                  <Image
                    src="/pixel_book_girl_v2.png"
                    alt="Book girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 연필 쓰는 학생 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.4 }}
                  className="absolute bottom-[25%] left-[45%]"
                >
                  <Image
                    src="/pixel_pencil_boy_v2.png"
                    alt="Pencil boy"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 바이올린 학생 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut", delay: 0.6 }}
                  className="absolute bottom-[25%] right-[25%]"
                >
                  <Image
                    src="/pixel_violin_girl_v2.png"
                    alt="Violin girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 리코더 학생 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: 0.2 }}
                  className="absolute bottom-[35%] left-[18%]"
                >
                  <Image
                    src="/pixel_recorder_boy_v2.png"
                    alt="Recorder boy"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 기타 학생 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.7, ease: "easeInOut", delay: 0.7 }}
                  className="absolute bottom-[20%] left-[38%]"
                >
                  <Image
                    src="/pixel_guitar_boy.png"
                    alt="Guitar boy"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 플루트 학생 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.35, ease: "easeInOut", delay: 0.8 }}
                  className="absolute bottom-[20%] right-[38%]"
                >
                  <Image
                    src="/pixel_flute_girl.png"
                    alt="Flute girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 음표들 */}
                <motion.div
                  animate={{ y: [0, -20, 0], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute top-[15%] right-[20%]"
                >
                  <Image
                    src="/3.png"
                    alt="Note"
                    width={40}
                    height={40}
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                  className="absolute top-[35%] right-[10%]"
                >
                  <Image
                    src="/4.png"
                    alt="Note"
                    width={40}
                    height={40}
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 4 }}
                  className="absolute bottom-[45%] left-[10%]"
                >
                  <Image
                    src="/5.png"
                    alt="Note"
                    width={40}
                    height={40}
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute top-[25%] left-[15%]"
                >
                  <Image
                    src="/6.png"
                    alt="Note"
                    width={40}
                    height={40}
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 3 }}
                  className="absolute bottom-[30%] right-[15%]"
                >
                  <Image
                    src="/7.png"
                    alt="Note"
                    width={40}
                    height={40}
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 진행률 표시 */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-3">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-amber-800 scale-150' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
