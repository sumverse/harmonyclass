'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import type { User } from '@supabase/supabase-js';

// 프로필 타입 정의
interface Profile {
  id: string;
  email: string;
  newsletter_subscribed: boolean;
  newsletter_tier: 'free' | 'premium' | null;
  subscription_status?: string;
  subscription_tier?: string;
}

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
  const [activeTab, setActiveTab] = useState<'lessons' | 'subscription' | 'info'>('lessons');
  const [profile, setProfile] = useState<Profile | null>(null);

  // 프로필 정보 가져오기
  const fetchProfile = useCallback(async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('프로필 조회 오류:', error);
      }
      
      if (data) {
        setProfile(data as Profile);
      } else {
        // 프로필이 없으면 기본값 설정
        setProfile({
          id: userId,
          email: email,
          newsletter_subscribed: false,
          newsletter_tier: null,
        });
      }
    } catch (error) {
      console.error('프로필 조회 오류:', error);
    }
  }, []);

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
        // 프로필 정보 가져오기
        if (session.user.email) {
          fetchProfile(session.user.id, session.user.email);
        }
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
        if (session.user.email) {
          fetchProfile(session.user.id, session.user.email);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, fetchProfile]);

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
              <Link href="/" className="mb-2 block w-fit">
                <Image src="/2.png" alt="harmonyclass" width={280} height={104} className="h-24 w-auto object-contain" />
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
              onClick={() => setActiveTab('subscription')}
              className={`pb-3 px-4 font-semibold transition ${
                activeTab === 'subscription'
                  ? 'text-amber-800 border-b-2 border-amber-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📧 구독 설정
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
        {activeTab === 'subscription' ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📧 메일 구독 설정</h2>
            
            {/* 현재 구독 상태 */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">현재 상태</h3>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  profile?.subscription_tier === 'premium'
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {profile?.subscription_tier === 'premium' ? '👑 프리미엄 회원' : '무료 회원'}
                </span>
              </div>
            </div>

            {/* 구독 옵션 */}
            <div className="space-y-6">
              {/* 무료 뉴스레터 구독 */}
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-amber-300 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">📬 무료 뉴스레터</h3>
                    <p className="text-gray-600 mb-4">
                      매주 음악 수업에 도움되는 팁, 새로운 수업자료 소식, 교육 트렌드를 받아보세요.
                    </p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>✓ 주간 음악교육 뉴스레터</li>
                      <li>✓ 무료 수업자료 미리보기</li>
                      <li>✓ 교사 커뮤니티 소식</li>
                    </ul>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as any).ml) {
                          (window as any).ml('show', 'V8CClE', true);
                        }
                      }}
                      className="px-6 py-3 bg-amber-800 text-white rounded-lg font-semibold hover:bg-amber-900 transition"
                    >
                      무료 구독하기 →
                    </button>
                  </div>
                </div>
              </div>

              {/* 프리미엄 구독 */}
              <div className="border-2 border-amber-300 rounded-xl p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">👑 프리미엄 구독</h3>
                      <span className="px-2 py-0.5 bg-amber-800 text-white text-xs rounded-full">추천</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      모든 무료 혜택 + 프리미엄 수업자료를 무제한으로 받아보세요.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ 무료 뉴스레터 모든 혜택</li>
                      <li>✓ <strong>프리미엄 수업자료 전체 열람</strong></li>
                      <li>✓ <strong>다운로드 가능한 수업 PPT, 악보</strong></li>
                      <li>✓ 신규 자료 우선 제공</li>
                    </ul>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-2xl font-bold text-amber-800 mb-2">₩9,900<span className="text-sm font-normal text-gray-500">/월</span></p>
                    {profile?.subscription_tier !== 'premium' ? (
                      <Link
                        href="/pricing"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-lg font-semibold hover:from-amber-800 hover:to-amber-950 transition shadow-lg"
                      >
                        프리미엄 시작하기
                      </Link>
                    ) : (
                      <span className="inline-block px-4 py-2 bg-amber-200 text-amber-900 rounded-lg text-sm font-semibold">
                        ✅ 구독 중
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 안내 문구 */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>알림:</strong> 뉴스레터는 {user?.email}로 발송됩니다. 
                스팸함도 확인해주세요!
              </p>
            </div>
          </div>
        ) : activeTab === 'lessons' ? (
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
