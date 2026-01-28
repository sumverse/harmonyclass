'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface NavbarProps {
  alwaysWhite?: boolean;
}

export default function Navbar({ alwaysWhite = false }: NavbarProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  useEffect(() => {
    if (alwaysWhite) {
      setIsScrolled(true);
      return;
    }
    
    const handleScroll = () => {
      // 히어로 섹션(5개 슬라이드 * 60vh - 화면 높이)이 끝나면 흰색으로 전환
      const heroHeight = window.innerHeight * 2;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysWhite]);

  useEffect(() => {
    // 현재 사용자 확인
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkUser();

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white rounded-b-[200px] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-10 flex items-center justify-center relative">
        {/* 로고 중앙 고정 */}
        <Link 
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <Image 
            src="/2.png" 
            alt="harmonyclass logo" 
            width={250} 
            height={250}
            className="rounded-lg w-[180px] md:w-[250px] h-auto object-contain"
          />
        </Link>

        {/* 모바일 메뉴 버튼 - 높은음자리표 */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden ml-auto z-50 p-2"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <Image
              src="/7.png"
              alt="메뉴"
              width={44}
              height={44}
              style={{ imageRendering: 'pixelated' }}
            />
          )}
        </button>
        
        {/* 네비게이션 메뉴 - 데스크탑 */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <div className="relative group">
            <Link 
              href="/"
              className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition relative z-10"
            >
              홈
            </Link>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none z-20 w-[32px] h-[32px]">
              <Image 
                src="/5.png" 
                alt="" 
                width={32} 
                height={32}
                className="animate-bounce w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="relative group">
            <Link 
              href="/samples"
              className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition relative z-10"
            >
              자료실
            </Link>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none z-20 w-[32px] h-[32px]">
              <Image 
                src="/5.png" 
                alt="" 
                width={32} 
                height={32}
                className="animate-bounce w-full h-full object-contain"
              />
            </div>
          </div>
          
          {user ? (
            <>
              <div className="relative group">
                <Link 
                  href="/profile"
                  className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition relative z-10"
                >
                  마이페이지
                </Link>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none z-20 w-[32px] h-[32px]">
                  <Image 
                    src="/5.png" 
                    alt="" 
                    width={32} 
                    height={32}
                    className="animate-bounce w-full h-full object-contain"
                  />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="font-title font-medium text-base text-gray-500 hover:text-gray-700 transition relative z-10"
              >
                로그아웃
              </button>
            </>
          ) : (
            <div className="relative group">
              <div className="flex items-center gap-1 relative z-10">
                <Link 
                  href="/login"
                  className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition"
                >
                  로그인
                </Link>
                <span className="text-gray-400">/</span>
                <Link 
                  href="/signup"
                  className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition"
                >
                  회원가입
                </Link>
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none z-20 w-[32px] h-[32px]">
                <Image 
                  src="/5.png" 
                  alt="" 
                  width={32} 
                  height={32}
                  className="animate-bounce w-full h-full object-contain"
                />
              </div>
            </div>
          )}
          
          <Link 
            href="/pricing"
            className="font-title bg-[#2C3E50] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#1A252F] transition relative z-10"
          >
            구독하기
          </Link>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-3xl py-4 px-6">
          <div className="flex flex-col gap-4">
            <Link 
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition text-left py-2"
            >
              홈
            </Link>
            <Link 
              href="/samples"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition text-left py-2"
            >
              자료실
            </Link>
            {user ? (
              <>
                <Link 
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition py-2"
                >
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-title font-medium text-base text-gray-500 hover:text-gray-700 transition py-2 text-left"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition py-2"
                >
                  로그인
                </Link>
                <Link 
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition py-2"
                >
                  회원가입
                </Link>
              </>
            )}
            <Link 
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-title bg-[#2C3E50] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#1A252F] transition text-center"
            >
              구독하기
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
