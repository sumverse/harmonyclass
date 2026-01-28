'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

// 샘플 수업자료 데이터 (나중에 DB에서 가져올 수 있음)
const sampleLessons = [
  {
    id: 1,
    title: '뮤지컬의 역사와 특징',
    category: '가창/합창',
    schoolLevel: '중학교',
    issue: '#23',
    date: '2026.01.20',
    isPremium: true,
  },
  {
    id: 2,
    title: 'K-POP으로 배우는 리듬',
    category: '감상',
    schoolLevel: '고등학교',
    issue: '#22',
    date: '2026.01.13',
    isPremium: false,
  },
  {
    id: 3,
    title: '우리나라 전통 악기',
    category: '기악',
    schoolLevel: '중학교',
    issue: '#21',
    date: '2026.01.06',
    isPremium: true,
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'lessons'>('lessons');

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/" className="text-3xl font-bold text-gray-900 mb-2 block">
                harmonyclass
              </Link>
              <p className="text-gray-600">안녕하세요, {user.email}님!</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                홈으로
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                로그아웃
              </button>
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`pb-3 px-4 font-semibold transition ${
                activeTab === 'lessons'
                  ? 'text-amber-800 border-b-2 border-amber-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              내 수업자료
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-3 px-4 font-semibold transition ${
                activeTab === 'info'
                  ? 'text-amber-800 border-b-2 border-amber-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              계정 정보
            </button>
          </div>
        </div>

        {/* 콘텐츠 */}
        {activeTab === 'lessons' ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 받은 수업자료</h2>
            
            <div className="space-y-4">
              {sampleLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                          {lesson.category}
                        </span>
                        <span className="text-sm text-gray-500">{lesson.schoolLevel}</span>
                        {lesson.isPremium && (
                          <span className="inline-block bg-gradient-to-r from-amber-700 to-amber-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            PREMIUM
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{lesson.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{lesson.issue}</span>
                        <span>•</span>
                        <span>{lesson.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="text-amber-800 hover:text-amber-900 font-medium text-sm">
                        다시보기 →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sampleLessons.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-600 mb-4">아직 받은 수업자료가 없습니다.</p>
                <Link
                  href="/pricing"
                  className="inline-block bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
                >
                  구독하고 수업자료 받기
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">👤 계정 정보</h2>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <label className="text-sm font-medium text-gray-600">이메일</label>
                <p className="text-gray-900 font-medium mt-1">{user.email}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <label className="text-sm font-medium text-gray-600">사용자 ID</label>
                <p className="text-gray-900 font-mono text-sm break-all mt-1">{user.id}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <label className="text-sm font-medium text-gray-600">가입일</label>
                <p className="text-gray-900 mt-1">
                  {new Date(user.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="pb-4">
                <label className="text-sm font-medium text-gray-600">마지막 로그인</label>
                <p className="text-gray-900 mt-1">
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

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">구독 관리</h3>
              <p className="text-sm text-gray-600 mb-4">
                현재 요금제: <span className="font-semibold text-gray-900">무료 플랜</span>
              </p>
              <Link
                href="/pricing"
                className="inline-block bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
              >
                프리미엄으로 업그레이드
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
