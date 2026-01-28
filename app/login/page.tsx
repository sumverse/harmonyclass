'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // 이미 로그인한 사용자인지 확인
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/profile');
      } else {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setMessage('');

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // 로그인 성공
      router.push('/profile');
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      
      if (error?.message) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = '이메일 인증이 필요합니다. 이메일을 확인해주세요.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
          <p className="text-gray-600">확인 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900 mb-2 block">
            harmonyclass
          </Link>
          <p className="text-gray-600">로그인하여 시작하세요</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              이메일 주소
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '로그인 중...' : '로그인하기'}
          </button>
        </form>

        {message && (
          <div className="mt-6 p-4 rounded-lg bg-red-50 text-red-800">
            {message}
          </div>
        )}

        <div className="mt-6 text-center space-y-3">
          <Link 
            href="/forgot-password" 
            className="block text-amber-800 hover:text-amber-900 text-sm font-medium"
          >
            비밀번호를 잊으셨나요?
          </Link>
          
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              계정이 없으신가요?
            </p>
            <Link
              href="/signup"
              className="text-amber-800 hover:text-amber-900 font-semibold"
            >
              회원가입하기
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
