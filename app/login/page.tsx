'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // 이미 로그인한 사용자인지 확인
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // 이미 로그인되어 있으면 프로필 페이지로 리다이렉트
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

      const { error, data } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      setMessage('✅ 이메일을 확인해주세요! 로그인 링크를 보내드렸습니다.');
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error_description) {
        errorMessage = error.error_description;
      }
      
      // 네트워크 오류인 경우 더 친화적인 메시지
      if (errorMessage.includes('fetch') || errorMessage.includes('Failed to fetch') || errorMessage.includes('ERR_NAME_NOT_RESOLVED')) {
        errorMessage = '네트워크 오류가 발생했습니다. Supabase URL과 키를 확인해주세요.';
      }
      
      setMessage(`❌ 오류: ${errorMessage}`);
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
          <p className="text-gray-600">매직 링크로 간편하게 로그인</p>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '전송 중...' : '로그인 링크 받기'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600 space-y-1">
          <p>비밀번호가 필요 없어요!</p>
          <p>이메일로 받은 링크를 클릭하면 자동 로그인됩니다.</p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-amber-800 hover:text-amber-900 text-sm font-medium">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
