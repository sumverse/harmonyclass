'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'nav-solid' : 'nav-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            harmonyclass
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('home')} 
            className={`nav-link font-medium transition ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
          >
            홈
          </button>
          <button 
            onClick={() => scrollToSection('intro')} 
            className={`nav-link font-medium transition ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
          >
            소개
          </button>
          <button 
            onClick={() => scrollToSection('sample')} 
            className={`nav-link font-medium transition ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
          >
            샘플
          </button>
          {user ? (
            <Link 
              href="/profile"
              className={`nav-link font-medium transition ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
            >
              마이페이지
            </Link>
          ) : (
            <Link 
              href="/login"
              className={`nav-link font-medium transition ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}
            >
              로그인
            </Link>
          )}
          <Link 
            href="/pricing"
            className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-lg font-semibold hover:bg-white/30 transition border border-white/30"
          >
            구독하기
          </Link>
        </div>
      </div>
    </nav>
  );
}
