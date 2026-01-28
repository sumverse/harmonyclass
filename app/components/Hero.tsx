'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

const heroTitles = [
  "바쁜 선생님을 위한\n음악 수업 솔루션",
  "매주 새로운 영감,\n음악 수업이 달라집니다"
];

const heroSubtitle = "음악과 학생을 사랑하는 선생님들을 위한 수업 레터";

const sections = [
  {
    id: 1,
    type: 'hero',
    title: "", // 동적으로 변경됨
    showCTA: false,
    showPixelRoom: true
  },
  {
    id: 2,
    type: 'problems',
    title: "혹시 이런 고민,\n하고 계신가요?",
    items: [
      "2022 개정 교육과정 수업 준비가 막막해요",
      "성취기준에 맞는 수업 자료가 필요해요",
      "수행평가 루브릭 만들기가 고민돼요",
      "창의적 음악활동 수업 아이디어가 필요해요",
      "에듀테크를 활용한 창의융합 수업을 하고 싶어요",
      "학생들의 눈이 반짝이는 수업을 만들고 싶어요"
    ]
  },
  {
    id: 3,
    type: 'sample',
    title: "이런 내용을 받아보실 수 있어요",
    sampleData: {
      title: "뮤지컬 수업 - 1차시",
      subtitle: "뮤지컬의 역사와 특징 | 중학교 1학년",
      goals: [
        "뮤지컬의 기원과 발전 과정을 설명할 수 있다",
        "뮤지컬의 주요 구성 요소(음악, 연기, 춤)를 구분하고 설명할 수 있다",
        "대표적인 뮤지컬 작품의 특징을 비교 분석할 수 있다"
      ],
      flow: [
        { time: "도입 10분", content: "뮤지컬 영상 감상 및 흥미 유발" },
        { time: "전개 30분", content: "뮤지컬 역사, 구성 요소, 작품 분석" },
        { time: "정리 5분", content: "학습 내용 정리 및 다음 차시 안내" }
      ],
      highlight: "추천 작품: 맘마미아, 캣츠(Memory), 위키드(Popular), 빨래"
    },
    premiumFeatures: [
      { icon: "/3.png", title: "상세 수업안", desc: "차시별 교수학습과정안" },
      { icon: "/4.png", title: "루브릭", desc: "수행평가 채점 기준표" },
      { icon: "/5.png", title: "활동지", desc: "바로 인쇄 가능한 학습지" },
      { icon: "/6.png", title: "성취기준", desc: "2022 교육과정 연계" },
      { icon: "/7.png", title: "지역별 공연정보", desc: "학생 체험학습 추천" }
    ]
  },
  {
    id: 4,
    type: 'cta',
    title: "지금 바로 시작하세요",
    subtitle: "매주 월요일, 출근길에 만나요!",
    showCTA: true
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [heroTitleIndex, setHeroTitleIndex] = useState(0);
  const [sampleSlide, setSampleSlide] = useState(0);
  const [expandedSample, setExpandedSample] = useState(false);
  const [expandedPremium, setExpandedPremium] = useState(false);
  const router = useRouter();

  // 히어로 타이틀 자동 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTitleIndex((prev) => (prev + 1) % heroTitles.length);
    }, 3000); // 3초마다 변경
    return () => clearInterval(interval);
  }, []);

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

  // 무료 구독하기 버튼 클릭 핸들러
  const handleFreeSubscribe = async () => {
    // 로그인 상태 확인
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // 로그인 안 됨 → 로그인 모달 표시
      setShowLoginModal(true);
      return;
    }
    
    // 로그인 됨 → MailerLite 팝업 띄우기
    if (typeof window !== 'undefined' && (window as any).ml) {
      (window as any).ml('show', 'V8CClE', true);
    }
  };

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
                section.type === 'sample' ? 'bg-[#FFFACD]' :
                section.type === 'cta' ? 'bg-[#FFFACD]' :
                'bg-gradient-to-br from-amber-50 to-orange-50'
              }`}></div>
            )}

            {/* 콘텐츠 */}
            <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
              {/* 제목 */}
              {section.type === 'hero' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: currentSection === index ? 1 : 0,
                    scale: currentSection === index ? 1 : 0.9
                  }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative inline-block">
                    {/* 칠판 배경 */}
                    <Image
                      src="/1.png"
                      alt="칠판"
                      width={800}
                      height={450}
                      className="w-[600px] md:w-[750px] h-auto"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    {/* 칠판 위 글씨 */}
                    <AnimatePresence>
                      <motion.h1
                        key={heroTitleIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center font-title font-bold text-3xl md:text-5xl text-white whitespace-pre-line text-center px-16 pb-10"
                        style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}
                      >
                        {heroTitles[heroTitleIndex]}
                      </motion.h1>
                    </AnimatePresence>
                  </div>
                  {/* 서브타이틀 */}
                  <p className="mt-6 text-lg md:text-xl text-gray-700 font-medium">
                    {heroSubtitle}
                  </p>
                </motion.div>
              ) : (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSection === index ? 1 : 0,
                    y: currentSection === index ? 0 : 20
                  }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className={`font-title font-bold mb-8 leading-tight whitespace-pre-line ${
                    section.type === 'sample' ? 'text-3xl md:text-5xl text-gray-900 pt-28' :
                    section.type === 'problems' ? 'text-3xl md:text-5xl text-gray-900 pt-16' :
                    section.type === 'solution' ? 'text-3xl md:text-5xl text-gray-900' :
                    section.type === 'cta' ? 'text-3xl md:text-5xl text-gray-900' :
                    'text-3xl md:text-5xl text-gray-900'
                  }`}
                >
                  {section.title}
                </motion.h1>
              )}

              {/* 리스트 (문제점) */}
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
                  className="space-y-4 mb-12 max-w-3xl mx-auto"
                >
                  {section.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm"
                    >
                      <Image 
                        src="/4.png" 
                        alt="" 
                        width={28} 
                        height={28}
                        className="flex-shrink-0"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <p className="text-gray-800 text-lg">{item}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* 샘플 미리보기 섹션 */}
              {section.type === 'sample' && section.sampleData && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: currentSection === index ? 1 : 0,
                    y: currentSection === index ? 0 : 30
                  }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="max-w-6xl mx-auto mt-4"
                >
                  {/* 모바일 슬라이드 */}
                  <div className="lg:hidden relative">
                    <div className="overflow-hidden">
                      <div 
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${sampleSlide * 100}%)` }}
                      >
                        {/* 슬라이드 1: 무료 샘플 */}
                        <div className="w-full flex-shrink-0 px-4">
                          <div className="bg-white rounded-2xl shadow-lg p-5 text-left">
                            <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full mb-4">
                              무료 제공
                            </div>
                            <div className="border-b border-gray-200 pb-4 mb-4">
                              <div className="text-lg text-[#2C3E50] font-bold mb-1">{section.sampleData.title}</div>
                              <div className="text-sm text-gray-700">{section.sampleData.subtitle}</div>
                            </div>
                            
                            {/* 요약 (항상 표시) */}
                            <div className="mb-4">
                              <h4 className="text-sm font-bold text-gray-900 mb-2">수업 목표</h4>
                              <p className="text-sm text-gray-700">• {section.sampleData.goals[0]}</p>
                              {!expandedSample && section.sampleData.goals.length > 1 && (
                                <p className="text-sm text-gray-500 mt-1">외 {section.sampleData.goals.length - 1}개...</p>
                              )}
                            </div>

                            {/* 펼쳐지는 내용 */}
                            {expandedSample && (
                              <div className="animate-fadeIn">
                                <ul className="space-y-2 mb-4">
                                  {section.sampleData.goals.slice(1).map((goal: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-900">
                                      <span className="text-[#2C3E50] mt-0.5">•</span>
                                      <span>{goal}</span>
                                    </li>
                                  ))}
                                </ul>
                                {section.sampleData.flow && (
                                  <div className="mb-4">
                                    <h4 className="text-sm font-bold text-gray-900 mb-3">수업 흐름 (45분)</h4>
                                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                                      {section.sampleData.flow.map((item: {time: string, content: string}, idx: number) => (
                                        <div key={idx} className="flex gap-3 text-sm">
                                          <span className="font-semibold text-gray-900 min-w-[70px]">{item.time}</span>
                                          <span className="text-gray-800">{item.content}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <div className="bg-amber-50 p-3 rounded-lg">
                                  <p className="text-sm text-[#2C3E50]">{section.sampleData.highlight}</p>
                                </div>
                              </div>
                            )}

                            {/* 더보기/접기 버튼 */}
                            <button 
                              onClick={() => setExpandedSample(!expandedSample)}
                              className="w-full mt-4 py-2 text-[#2C3E50] font-semibold text-sm flex items-center justify-center gap-1"
                            >
                              {expandedSample ? '접기' : '더보기'}
                              <svg className={`w-4 h-4 transition-transform ${expandedSample ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* 슬라이드 2: 프리미엄 */}
                        {section.premiumFeatures && (
                          <div className="w-full flex-shrink-0 px-4">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-300 shadow-lg">
                              <div className="inline-block bg-[#2C3E50] text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                                ⭐ 프리미엄
                              </div>
                              <p className="text-base font-bold text-gray-900 mb-4">
                                구독 시 추가 제공
                              </p>
                              
                              {/* 요약 (처음 2개만) */}
                              <div className="space-y-3">
                                {section.premiumFeatures.slice(0, expandedPremium ? section.premiumFeatures.length : 2).map((feature: {icon: string, title: string, desc: string}, idx: number) => (
                                  <div key={idx} className="bg-white rounded-xl p-3 shadow-sm">
                                    <div className="flex items-center gap-3">
                                      <Image src={feature.icon} alt="" width={24} height={24} style={{ imageRendering: 'pixelated' }} />
                                      <div className="text-left">
                                        <div className="text-sm font-bold text-gray-900">{feature.title}</div>
                                        <div className="text-xs text-gray-600">{feature.desc}</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              {!expandedPremium && section.premiumFeatures.length > 2 && (
                                <p className="text-sm text-gray-500 mt-2 text-center">외 {section.premiumFeatures.length - 2}개...</p>
                              )}

                              {/* 더보기/접기 버튼 */}
                              <button 
                                onClick={() => setExpandedPremium(!expandedPremium)}
                                className="w-full mt-4 py-2 text-[#2C3E50] font-semibold text-sm flex items-center justify-center gap-1"
                              >
                                {expandedPremium ? '접기' : '더보기'}
                                <svg className={`w-4 h-4 transition-transform ${expandedPremium ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 슬라이드 인디케이터 */}
                    <div className="flex items-center justify-center gap-2 mt-5">
                      <button 
                        onClick={() => { setSampleSlide(0); setExpandedSample(false); setExpandedPremium(false); }}
                        className={`w-2 h-2 rounded-full transition-all ${sampleSlide === 0 ? 'bg-gray-800 w-6' : 'bg-gray-300'}`}
                      />
                      <button 
                        onClick={() => { setSampleSlide(1); setExpandedSample(false); setExpandedPremium(false); }}
                        className={`w-2 h-2 rounded-full transition-all ${sampleSlide === 1 ? 'bg-gray-800 w-6' : 'bg-gray-300'}`}
                      />
                    </div>
                  </div>

                  {/* 데스크탑: 나란히 표시 */}
                  <div className="hidden lg:flex flex-row gap-10">
                    {/* 왼쪽: 무료 샘플 */}
                    <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 text-left">
                      <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-5">
                        무료 제공
                      </div>
                      <div className="border-b border-gray-200 pb-5 mb-6">
                        <div className="text-xl text-[#2C3E50] font-bold mb-2">{section.sampleData.title}</div>
                        <div className="text-base text-gray-700">{section.sampleData.subtitle}</div>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-base font-bold text-gray-900 mb-4">수업 목표</h4>
                        <ul className="space-y-3">
                          {section.sampleData.goals.map((goal: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-base text-gray-900">
                              <span className="text-[#2C3E50] mt-0.5">•</span>
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {section.sampleData.flow && (
                        <div className="mb-6">
                          <h4 className="text-base font-bold text-gray-900 mb-4">수업 흐름 (45분)</h4>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            {section.sampleData.flow.map((item: {time: string, content: string}, idx: number) => (
                              <div key={idx} className="flex gap-4 text-base">
                                <span className="font-semibold text-gray-900 min-w-[80px]">{item.time}</span>
                                <span className="text-gray-800">{item.content}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <p className="text-base text-[#2C3E50]">{section.sampleData.highlight}</p>
                      </div>
                    </div>

                    {/* 오른쪽: 프리미엄 혜택 */}
                    {section.premiumFeatures && (
                      <div className="w-72 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-300 shadow-lg">
                        <div className="inline-block bg-[#2C3E50] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-5">
                          ⭐ 프리미엄
                        </div>
                        <p className="text-base font-bold text-gray-900 mb-5">
                          구독 시 추가 제공
                        </p>
                        <div className="space-y-4">
                          {section.premiumFeatures.map((feature: {icon: string, title: string, desc: string}, idx: number) => (
                            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                              <div className="flex items-center gap-3">
                                <Image src={feature.icon} alt="" width={28} height={28} style={{ imageRendering: 'pixelated' }} />
                                <div className="text-left">
                                  <div className="text-base font-bold text-gray-900">{feature.title}</div>
                                  <div className="text-sm text-gray-600">{feature.desc}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-8 gap-4">
                    <p className="text-gray-600 text-base">
                      ✨ 실제 뉴스레터 샘플입니다
                    </p>
                    <Link 
                      href="/samples"
                      className="inline-flex items-center gap-2 text-[#2C3E50] text-lg font-bold hover:text-[#1A252F] transition"
                    >
                      harmonyclass에서 제공하는 수업 더 보기
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* 서브타이틀 (CTA 섹션) */}
              {section.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSection === index ? 1 : 0,
                    y: currentSection === index ? 0 : 20
                  }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-600 mb-8"
                >
                  {section.subtitle}
                </motion.p>
              )}

              {/* CTA 버튼 */}
              {section.showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSection === index ? 1 : 0,
                    y: currentSection === index ? 0 : 20
                  }}
                  transition={{ duration: 0.4, delay: section.subtitle ? 0.5 : 0.6 }}
                  className="space-y-4"
                >
                  <button 
                    onClick={handleFreeSubscribe}
                    className="font-title inline-block bg-[#2C3E50] text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#1A252F] transition shadow-2xl cursor-pointer"
                  >
                    무료 구독하기 →
                  </button>
                </motion.div>
              )}
            </div>

            {/* 픽셀 캐릭터들 (첫 화면에만) */}
            {section.showPixelRoom && currentSection === 0 && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* 선생님 - 왼쪽 위 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-[12%] left-[5%]"
                >
                  <Image
                    src="/pixel_female_music_teacher_v3.png"
                    alt="Music teacher"
                    width={100}
                    height={100}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </motion.div>

                {/* 피아노 치는 여학생 - 왼쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute bottom-[12%] left-[3%]"
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

                {/* 리코더 학생 - 왼쪽 중간 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: 0.2 }}
                  className="absolute top-[45%] left-[8%]"
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

                {/* 책 읽는 학생 - 오른쪽 위 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut", delay: 0.1 }}
                  className="absolute top-[15%] right-[8%]"
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

                {/* 드럼 학생 - 오른쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                  className="absolute bottom-[12%] right-[3%]"
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

                {/* 바이올린 학생 - 오른쪽 중간 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut", delay: 0.6 }}
                  className="absolute top-[45%] right-[8%]"
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

                {/* 기타 학생 - 칠판 왼쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.7, ease: "easeInOut", delay: 0.7 }}
                  className="absolute bottom-[22%] left-[20%]"
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

                {/* 플루트 학생 - 칠판 오른쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.35, ease: "easeInOut", delay: 0.8 }}
                  className="absolute bottom-[22%] right-[20%]"
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

                {/* 연필 쓰는 학생 - 왼쪽 위 (선생님 옆) */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.4 }}
                  className="absolute top-[25%] left-[18%]"
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

                {/* 음표들 - 모바일에서는 숨김 */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="hidden md:block absolute top-[10%] right-[15%]"
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
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                  className="hidden md:block absolute top-[40%] right-[3%]"
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
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 4 }}
                  className="hidden md:block absolute bottom-[50%] left-[3%]"
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
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="hidden md:block absolute top-[10%] left-[12%]"
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
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 3 }}
                  className="hidden md:block absolute bottom-[35%] right-[3%]"
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

            {/* 픽셀 캐릭터들 (problems 섹션) - 첫 화면과 동일 배치 */}
            {section.type === 'problems' && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* 선생님 - 왼쪽 위 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                  className="hidden md:block absolute top-[12%] left-[5%]"
                >
                  <Image
                    src="/pixel_female_music_teacher_v3.png"
                    alt="Music teacher"
                    width={100}
                    height={100}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 피아노 치는 여학생 - 왼쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="hidden md:block absolute bottom-[12%] left-[3%]"
                >
                  <Image
                    src="/pixel_piano_girl_v2.png"
                    alt="Piano girl"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 리코더 학생 - 왼쪽 중간 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: 0.2 }}
                  className="hidden md:block absolute top-[45%] left-[8%]"
                >
                  <Image
                    src="/pixel_recorder_boy_v2.png"
                    alt="Recorder boy"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 책 읽는 학생 - 오른쪽 위 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut", delay: 0.1 }}
                  className="hidden md:block absolute top-[15%] right-[8%]"
                >
                  <Image
                    src="/pixel_book_girl_v2.png"
                    alt="Book girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 드럼 학생 - 오른쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                  className="hidden md:block absolute bottom-[12%] right-[3%]"
                >
                  <Image
                    src="/pixel_drum_boy_v2.png"
                    alt="Drum boy"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 바이올린 학생 - 오른쪽 중간 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut", delay: 0.6 }}
                  className="hidden md:block absolute top-[45%] right-[8%]"
                >
                  <Image
                    src="/pixel_violin_girl_v2.png"
                    alt="Violin girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 기타 학생 - 칠판 왼쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.7, ease: "easeInOut", delay: 0.7 }}
                  className="hidden md:block absolute bottom-[22%] left-[20%]"
                >
                  <Image
                    src="/pixel_guitar_boy.png"
                    alt="Guitar boy"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 플루트 학생 - 칠판 오른쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.35, ease: "easeInOut", delay: 0.8 }}
                  className="hidden md:block absolute bottom-[22%] right-[20%]"
                >
                  <Image
                    src="/pixel_flute_girl.png"
                    alt="Flute girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 연필 쓰는 학생 - 왼쪽 위 (선생님 옆) */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.4 }}
                  className="hidden md:block absolute top-[25%] left-[18%]"
                >
                  <Image
                    src="/pixel_pencil_boy_v2.png"
                    alt="Pencil boy"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 음표들 */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="hidden md:block absolute top-[10%] right-[15%]"
                >
                  <Image src="/3.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                  className="hidden md:block absolute top-[40%] right-[3%]"
                >
                  <Image src="/4.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 4 }}
                  className="hidden md:block absolute bottom-[50%] left-[3%]"
                >
                  <Image src="/5.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="hidden md:block absolute top-[10%] left-[12%]"
                >
                  <Image src="/6.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 3 }}
                  className="hidden md:block absolute bottom-[35%] right-[3%]"
                >
                  <Image src="/7.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
              </div>
            )}

            {/* 픽셀 캐릭터들 (sample 섹션) */}
            {section.type === 'sample' && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* 선생님 - 왼쪽 위 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                  className="hidden md:block absolute top-[12%] left-[5%]"
                >
                  <Image
                    src="/pixel_female_music_teacher_v3.png"
                    alt="Music teacher"
                    width={100}
                    height={100}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 피아노 치는 여학생 - 왼쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="hidden md:block absolute bottom-[12%] left-[3%]"
                >
                  <Image
                    src="/pixel_piano_girl_v2.png"
                    alt="Piano girl"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 리코더 학생 - 왼쪽 중간 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: 0.2 }}
                  className="hidden md:block absolute top-[45%] left-[8%]"
                >
                  <Image
                    src="/pixel_recorder_boy_v2.png"
                    alt="Recorder boy"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 책 읽는 학생 - 오른쪽 위 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut", delay: 0.1 }}
                  className="hidden md:block absolute top-[15%] right-[8%]"
                >
                  <Image
                    src="/pixel_book_girl_v2.png"
                    alt="Book girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 드럼 학생 - 오른쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                  className="hidden md:block absolute bottom-[12%] right-[3%]"
                >
                  <Image
                    src="/pixel_drum_boy_v2.png"
                    alt="Drum boy"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 바이올린 학생 - 오른쪽 중간 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut", delay: 0.6 }}
                  className="hidden md:block absolute top-[45%] right-[8%]"
                >
                  <Image
                    src="/pixel_violin_girl_v2.png"
                    alt="Violin girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 음표들 */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="hidden md:block absolute top-[10%] right-[15%]"
                >
                  <Image src="/3.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                  className="hidden md:block absolute top-[40%] right-[3%]"
                >
                  <Image src="/4.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 4 }}
                  className="hidden md:block absolute bottom-[50%] left-[3%]"
                >
                  <Image src="/5.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="hidden md:block absolute top-[10%] left-[12%]"
                >
                  <Image src="/6.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 3 }}
                  className="hidden md:block absolute bottom-[35%] right-[3%]"
                >
                  <Image src="/7.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
              </div>
            )}

            {/* 픽셀 캐릭터들 (cta 섹션) - 첫 화면과 동일 배치 */}
            {section.type === 'cta' && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* 선생님 - 왼쪽 위 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-[12%] left-[5%]"
                >
                  <Image
                    src="/pixel_female_music_teacher_v3.png"
                    alt="Music teacher"
                    width={100}
                    height={100}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 피아노 치는 여학생 - 왼쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute bottom-[12%] left-[3%]"
                >
                  <Image
                    src="/pixel_piano_girl_v2.png"
                    alt="Piano girl"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 리코더 학생 - 왼쪽 중간 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: 0.2 }}
                  className="absolute top-[45%] left-[8%]"
                >
                  <Image
                    src="/pixel_recorder_boy_v2.png"
                    alt="Recorder boy"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 책 읽는 학생 - 오른쪽 위 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut", delay: 0.1 }}
                  className="absolute top-[15%] right-[8%]"
                >
                  <Image
                    src="/pixel_book_girl_v2.png"
                    alt="Book girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 드럼 학생 - 오른쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                  className="absolute bottom-[12%] right-[3%]"
                >
                  <Image
                    src="/pixel_drum_boy_v2.png"
                    alt="Drum boy"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 바이올린 학생 - 오른쪽 중간 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut", delay: 0.6 }}
                  className="absolute top-[45%] right-[8%]"
                >
                  <Image
                    src="/pixel_violin_girl_v2.png"
                    alt="Violin girl"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 기타 학생 - 칠판 왼쪽 아래 */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.7, ease: "easeInOut", delay: 0.7 }}
                  className="absolute bottom-[22%] left-[20%]"
                >
                  <Image
                    src="/pixel_guitar_boy.png"
                    alt="Guitar boy"
                    width={64}
                    height={64}
                    className="drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>

                {/* 음표들 (모바일에서 숨김) */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="hidden md:block absolute top-[10%] right-[15%]"
                >
                  <Image src="/3.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                  className="hidden md:block absolute top-[40%] right-[3%]"
                >
                  <Image src="/4.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 4 }}
                  className="hidden md:block absolute bottom-[50%] left-[3%]"
                >
                  <Image src="/5.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="hidden md:block absolute top-[10%] left-[12%]"
                >
                  <Image src="/6.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 3 }}
                  className="hidden md:block absolute bottom-[35%] right-[3%]"
                >
                  <Image src="/7.png" alt="Note" width={40} height={40} style={{ imageRendering: 'pixelated' }} />
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>


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
