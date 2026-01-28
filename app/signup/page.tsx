'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

// 비밀번호 강도 계산 함수
const calculatePasswordStrength = (password: string) => {
  if (!password) return { strength: 0, text: '', color: '' };
  
  let strength = 0;
  
  // 길이 체크
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  
  // 대문자 포함
  if (/[A-Z]/.test(password)) strength += 15;
  
  // 소문자 포함
  if (/[a-z]/.test(password)) strength += 15;
  
  // 숫자 포함
  if (/[0-9]/.test(password)) strength += 10;
  
  // 특수문자 포함
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;
  
  // 강도 레벨 결정
  if (strength < 40) {
    return { strength, text: '약함', color: 'bg-red-500' };
  } else if (strength < 70) {
    return { strength, text: '보통', color: 'bg-yellow-500' };
  } else {
    return { strength, text: '강함', color: 'bg-green-500' };
  }
};

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const passwordStrength = calculatePasswordStrength(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 비밀번호 확인
    if (password !== confirmPassword) {
      setMessage('❌ 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 길이 확인
    if (password.length < 6) {
      setMessage('❌ 비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) {
        throw error;
      }

      // 회원가입 성공
      setMessage('✅ 회원가입이 완료되었습니다! 이메일을 확인하여 계정을 인증해주세요.');
      
      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (error: any) {
      console.error('Signup error:', error);
      
      let errorMessage = '회원가입 중 오류가 발생했습니다.';
      
      if (error?.message) {
        if (error.message.includes('already registered')) {
          errorMessage = '이미 가입된 이메일입니다.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = '올바른 이메일 주소를 입력해주세요.';
        } else {
          errorMessage = error.message;
        }
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
          <p className="text-gray-600">새로운 계정 만들기</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
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
              placeholder="최소 6자 이상"
              required
              minLength={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            />
            
            {/* 비밀번호 강도 표시 */}
            {password && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">비밀번호 강도:</span>
                  <span className={`text-sm font-semibold ${
                    passwordStrength.text === '약함' ? 'text-red-600' :
                    passwordStrength.text === '보통' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {passwordStrength.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p>💡 강력한 비밀번호를 위한 팁:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li className={password.length >= 8 ? 'text-green-600' : ''}>8자 이상 사용</li>
                    <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>대문자 포함</li>
                    <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>숫자 포함</li>
                    <li className={/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}>특수문자 포함 (!@#$%^&*)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 재입력"
              required
              minLength={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2C3E50] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1A252F] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '회원가입 중...' : '회원가입하기'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600 space-y-1">
          <p>회원가입 후 이메일 인증이 필요합니다.</p>
          <p>이메일로 발송된 링크를 클릭해주세요.</p>
        </div>

        <div className="mt-6 text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            이미 계정이 있으신가요?
          </p>
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-bold text-lg underline"
          >
            로그인하기
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm font-medium">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
