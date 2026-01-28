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
      className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300`}
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="harmonyclass logo" 
            width={120} 
            height={120}
            className="rounded-lg"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('home')} 
            className="nav-link font-medium text-white/90 hover:text-white transition"
          >
            홈
          </button>
          <button 
            onClick={() => scrollToSection('intro')} 
            className="nav-link font-medium text-white/90 hover:text-white transition"
          >
            소개
          </button>
          <button 
            onClick={() => scrollToSection('sample')} 
            className="nav-link font-medium text-white/90 hover:text-white transition"
          >
            샘플
          </button>
          {user ? (
            <Link 
              href="/profile"
              className="nav-link font-medium text-white/90 hover:text-white transition"
            >
              마이페이지
            </Link>
          ) : (
            <Link 
              href="/login"
              className="nav-link font-medium text-white/90 hover:text-white transition"
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
