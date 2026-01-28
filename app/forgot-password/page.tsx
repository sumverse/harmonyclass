'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setMessage('');

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setMessage('✅ 비밀번호 재설정 링크를 이메일로 보내드렸습니다. 이메일을 확인해주세요.');
      setEmail('');
      
    } catch (error: any) {
      console.error('Reset password error:', error);
      
      let errorMessage = '오류가 발생했습니다.';
      
      if (error?.message) {
        errorMessage = error.message;
      }
      
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="mb-2 block w-fit mx-auto">
            <Image src="/2.png" alt="harmonyclass" width={280} height={104} className="h-24 w-auto object-contain mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">비밀번호 재설정</h1>
          <p className="text-gray-600">
            가입하신 이메일 주소를 입력해주세요.
            <br />
            비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-6">
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
            className="w-full bg-[#2C3E50] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1A252F] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '전송 중...' : '재설정 링크 받기'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            ← 로그인으로 돌아가기
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-2">
            계정이 없으신가요?
          </p>
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-800 font-bold text-lg underline"
          >
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
