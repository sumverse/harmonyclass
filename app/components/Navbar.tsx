'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  };

  return (
    <nav 
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300`}
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* 왼쪽 빈 공간 (로고 중앙 배치를 위한) */}
        <div className="flex-1"></div>
        
        {/* 로고 중앙 배치 */}
        <div className="flex-1 flex justify-center">
          <Image 
            src="/2.png" 
            alt="harmonyclass logo" 
            width={240} 
            height={240}
            className="rounded-lg w-[240px] h-auto object-contain"
          />
        </div>
        
        {/* 네비게이션 메뉴 - 오른쪽 배치 */}
        <div className="flex-1 hidden md:flex items-center justify-end gap-6">
          <div className="relative group">
            <button 
              onClick={() => scrollToSection('home')} 
              className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition relative z-10"
            >
              홈
            </button>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none z-20 w-[56px] h-[56px]">
              <Image 
                src="/5.png" 
                alt="" 
                width={56} 
                height={56}
                className="animate-bounce w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="relative group">
            <button 
              onClick={() => scrollToSection('intro')} 
              className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition relative z-10"
            >
              소개
            </button>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none z-20 w-[56px] h-[56px]">
              <Image 
                src="/5.png" 
                alt="" 
                width={56} 
                height={56}
                className="animate-bounce w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="relative group">
            <button 
              onClick={() => scrollToSection('sample')} 
              className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition relative z-10"
            >
              샘플
            </button>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none z-20 w-[56px] h-[56px]">
              <Image 
                src="/5.png" 
                alt="" 
                width={56} 
                height={56}
                className="animate-bounce w-full h-full object-contain"
              />
            </div>
          </div>
          
          {user ? (
            <div className="relative group">
              <Link 
                href="/profile"
                className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition relative z-10"
              >
                마이페이지
              </Link>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none z-20 w-[56px] h-[56px]">
                <Image 
                  src="/5.png" 
                  alt="" 
                  width={56} 
                  height={56}
                  className="animate-bounce w-full h-full object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="relative group">
              <Link 
                href="/login"
                className="font-title font-medium text-base text-gray-900 hover:text-gray-700 transition relative z-10"
              >
                로그인
              </Link>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 pointer-events-none z-20 w-[56px] h-[56px]">
                <Image 
                  src="/5.png" 
                  alt="" 
                  width={56} 
                  height={56}
                  className="animate-bounce w-full h-full object-contain"
                />
              </div>
            </div>
          )}
          
          <Link 
            href="/pricing"
            className="font-title bg-amber-800 text-white px-5 py-2 rounded-lg font-semibold hover:bg-amber-900 transition relative z-10"
          >
            구독하기
          </Link>
        </div>
      </div>
    </nav>
  );
}
