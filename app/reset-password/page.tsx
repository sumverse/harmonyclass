'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

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

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  
  const passwordStrength = calculatePasswordStrength(password);

  useEffect(() => {
    // URL에서 토큰 확인
    const checkToken = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidToken(true);
      } else {
        setMessage('❌ 유효하지 않은 링크입니다. 비밀번호 재설정을 다시 요청해주세요.');
      }
    };

    checkToken();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
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

      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        throw error;
      }

      setMessage('✅ 비밀번호가 성공적으로 변경되었습니다! 로그인 페이지로 이동합니다...');
      
      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (error: any) {
      console.error('Reset password error:', error);
      
      let errorMessage = '비밀번호 변경 중 오류가 발생했습니다.';
      
      if (error?.message) {
        errorMessage = error.message;
      }
      
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isValidToken && !message) {
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
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">새 비밀번호 설정</h1>
          <p className="text-gray-600">
            새로운 비밀번호를 입력해주세요.
          </p>
        </div>

        {isValidToken ? (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                새 비밀번호
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
              className="w-full bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '변경 중...' : '비밀번호 변경하기'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="inline-block bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
            >
              비밀번호 재설정 다시 요청하기
            </Link>
          </div>
        )}

        {message && (
          <div className={`mt-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← 로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
