'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error:', error);
          router.push('/login');
          return;
        }

        if (!session) {
          router.push('/login');
          return;
        }

        setUser(session.user);
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-gray-900 mb-2 block">
              harmonyclass
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-6">내 프로필</h1>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">이메일</label>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">사용자 ID</label>
                  <p className="text-gray-900 font-mono text-sm break-all">{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">가입일</label>
                  <p className="text-gray-900">
                    {new Date(user.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">마지막 로그인</label>
                  <p className="text-gray-900">
                    {user.last_sign_in_at 
                      ? new Date(user.last_sign_in_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '정보 없음'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Supabase Dashboard에서 확인하기</h2>
              <p className="text-sm text-gray-600 mb-4">
                모든 회원 데이터는 Supabase Dashboard의 <strong>Authentication → Users</strong> 메뉴에서 확인할 수 있습니다.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>이메일 주소</li>
                <li>가입일 및 마지막 로그인 시간</li>
                <li>인증 상태</li>
                <li>메타데이터</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                로그아웃
              </button>
              <Link
                href="/"
                className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
              >
                홈으로
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
