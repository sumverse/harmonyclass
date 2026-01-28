'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SamplesPage() {
  const [schoolLevel, setSchoolLevel] = useState('middle');
  const [category, setCategory] = useState('all');
  const [selectedSample, setSelectedSample] = useState<any>(null);

  const samples = [
    // 기악 - 초등학교
    {
      id: 1,
      title: '리코더로 배우는 동요',
      schoolLevel: 'elementary',
      categories: ['기악'],
      issue: '#24',
      date: '2026.01.27',
      summary: '초등학교 리코더 수업 - 도레미송, 학교종 연주하고 모둠 합주하기 (2차시)',
    },
    {
      id: 2,
      title: '우리 반 오케스트라',
      schoolLevel: 'elementary',
      categories: ['기악'],
      issue: '#25',
      date: '2026.02.03',
      summary: '초등학교 타악기 수업 - 캐스터네츠, 탬버린, 트라이앵글로 리듬 연주하기 (2차시)',
    },

    // 기악 - 중학교
    {
      id: 3,
      title: '기타로 시작하는 K-POP',
      schoolLevel: 'middle',
      categories: ['기악'],
      issue: '#26',
      date: '2026.02.10',
      summary: '중학교 기타 수업 - 기본 코드 배우고 좋아하는 K-POP 반주하기 (3차시)',
    },
    {
      id: 4,
      title: '우쿨렐레로 배우는 화음',
      schoolLevel: 'middle',
      categories: ['기악'],
      issue: '#27',
      date: '2026.02.17',
      summary: '중학교 우쿨렐레 수업 - C, F, G 코드 익히고 모둠 연주 발표하기 (3차시)',
    },

    // 기악 - 고등학교
    {
      id: 5,
      title: '밴드로 완성하는 학교 축제',
      schoolLevel: 'high',
      categories: ['기악'],
      issue: '#28',
      date: '2026.02.24',
      summary: '고등학교 밴드 수업 - 보컬, 기타, 베이스, 드럼 파트 나눠 합주곡 완성하기 (3차시)',
    },
    {
      id: 6,
      title: '건반으로 만드는 나만의 음악',
      schoolLevel: 'high',
      categories: ['기악'],
      issue: '#29',
      date: '2026.03.03',
      summary: '고등학교 건반 수업 - 멜로디 라인 작곡하고 편곡 프로그램으로 반주 만들기 (3차시)',
    },

    // 감상 - 초등학교
    {
      id: 7,
      title: '사계절 음악 여행',
      schoolLevel: 'elementary',
      categories: ['감상'],
      issue: '#30',
      date: '2026.03.10',
      summary: '초등학교 음악 감상 - 비발디 사계 듣고 계절별 느낌 그림으로 표현하기 (2차시)',
    },
    {
      id: 8,
      title: '동물의 사육제 탐험',
      schoolLevel: 'elementary',
      categories: ['감상'],
      issue: '#31',
      date: '2026.03.17',
      summary: '초등학교 음악 감상 - 생상스 동물의 사육제 듣고 동물 특징 찾아 움직임으로 표현하기 (2차시)',
    },

    // 감상 - 중학교
    {
      id: 9,
      title: '영화음악으로 배우는 감정 표현',
      schoolLevel: 'middle',
      categories: ['감상'],
      issue: '#32',
      date: '2026.03.24',
      summary: '中 영화음악 감상 - 장면별 배경음악 분석하고 감정 변화 따라 감상문 쓰기 (3차시)',
    },
    {
      id: 10,
      title: '클래식으로 만나는 세계사',
      schoolLevel: 'middle',
      categories: ['감상'],
      issue: '#33',
      date: '2026.03.31',
      summary: '中 시대별 음악 감상 - 바로크부터 현대음악까지 시대 특징 비교하며 듣기 (3차시)',
    },

    // 감상 - 고등학교
    {
      id: 11,
      title: '뮤지컬 넘버 깊이 듣기',
      schoolLevel: 'high',
      categories: ['감상'],
      issue: '#34',
      date: '2026.04.07',
      summary: '高 뮤지컬 음악 감상 - 레미제라블, 위키드 주요 넘버 분석하고 음악적 의미 토론하기 (3차시)',
    },
    {
      id: 12,
      title: '국악과 K-POP의 만남',
      schoolLevel: 'high',
      categories: ['감상'],
      issue: '#35',
      date: '2026.04.14',
      summary: '高 퓨전국악 감상 - 전통음악 요소가 담긴 현대 대중음악 찾아 비교 분석하기 (3차시)',
    },

    // 창작 - 초등학교
    {
      id: 13,
      title: '나만의 동요 만들기',
      schoolLevel: 'elementary',
      categories: ['창작'],
      issue: '#36',
      date: '2026.04.21',
      summary: '초등학교 작곡 수업 - 4마디 멜로디 만들고 리코더로 연주해보기 (2차시)',
    },
    {
      id: 14,
      title: '리듬으로 말해요',
      schoolLevel: 'elementary',
      categories: ['창작'],
      issue: '#37',
      date: '2026.04.28',
      summary: '초등학교 리듬 창작 - 내 이름, 좋아하는 말을 리듬으로 만들어 모둠 발표하기 (2차시)',
    },

    // 창작 - 중학교
    {
      id: 15,
      title: 'AI와 함께 만드는 BGM',
      schoolLevel: 'middle',
      categories: ['창작', '디지털/에듀테크'],
      issue: '#38',
      date: '2026.05.05',
      summary: '中 AI 작곡 수업 - Suno AI로 장면별 배경음악 만들고 영상에 삽입하기 (3차시)',
    },
    {
      id: 16,
      title: '우리 반 힙합 만들기',
      schoolLevel: 'middle',
      categories: ['창작'],
      issue: '#39',
      date: '2026.05.12',
      summary: '中 가사 창작 수업 - 학교생활 주제로 랩 가사 쓰고 비트 위에 녹음하기 (3차시)',
    },

    // 창작 - 고등학교
    {
      id: 17,
      title: '나만의 플레이리스트 큐레이션',
      schoolLevel: 'high',
      categories: ['창작'],
      issue: '#40',
      date: '2026.05.19',
      summary: '高 음악 기획 수업 - 테마별 플레이리스트 만들고 곡 선정 이유 발표하기 (3차시)',
    },
    {
      id: 18,
      title: '모둠 작곡 프로젝트',
      schoolLevel: 'high',
      categories: ['창작', '디지털/에듀테크'],
      issue: '#41',
      date: '2026.05.26',
      summary: '高 협업 작곡 수업 - GarageBand로 모둠별 1분 길이 완성곡 만들기 (3차시)',
    },

    // 기존 가창/합창 샘플
    {
      id: 19,
      title: '뮤지컬의 역사와 특징',
      schoolLevel: 'middle',
      categories: ['가창/합창', '디지털/에듀테크'],
      issue: '#23',
      date: '2026.01.20',
      summary: '중학교 뮤지컬 수업 - 뮤지컬 넘버 배우고 메타버스 박물관 만들기 (3차시)',
    },
    {
      id: 20,
      title: '뮤지컬의 역사와 특징 (심화)',
      schoolLevel: 'high',
      categories: ['가창/합창', '디지털/에듀테크'],
      issue: '#23',
      date: '2026.01.20',
      summary: '고등학교 뮤지컬 수업 - 뮤지컬 넘버 배우고 Spotvirtual로 도서관 만들기 (4차시)',
    },
  ];

  const filteredSamples = samples.filter(sample => {
    const matchesSchoolLevel = sample.schoolLevel === schoolLevel;
    const matchesCategory = category === 'all' || sample.categories.includes(category);
    return matchesSchoolLevel && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            harmonyclass
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← 홈으로
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contents</h1>
        <p className="text-gray-600 mb-8">harmonyclass가 제공하는 모든 수업자료</p>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">학교급</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSchoolLevel('elementary')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    schoolLevel === 'elementary'
                      ? 'bg-amber-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  초등학교
                </button>
                <button
                  onClick={() => setSchoolLevel('middle')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    schoolLevel === 'middle'
                      ? 'bg-amber-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  중학교
                </button>
                <button
                  onClick={() => setSchoolLevel('high')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    schoolLevel === 'high'
                      ? 'bg-amber-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  고등학교
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              >
                <option value="all">전체</option>
                <option value="가창/합창">가창/합창</option>
                <option value="기악">기악</option>
                <option value="감상">감상</option>
                <option value="창작">창작</option>
                <option value="디지털/에듀테크">디지털/에듀테크</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sample Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              onClick={() => setSelectedSample(sample)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                {sample.categories.map((cat, idx) => (
                  <span key={idx} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{sample.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{sample.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{sample.issue}</span>
                <span>{sample.date}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSamples.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">해당 조건의 수업 자료가 없습니다.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedSample && (
        <div
          onClick={() => setSelectedSample(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex gap-2 mb-3">
                  {selectedSample.categories.map((cat: string, idx: number) => (
                    <span key={idx} className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedSample.title}</h2>
                <p className="text-gray-600 mt-2">
                  {selectedSample.schoolLevel === 'elementary' ? '초등학교' : selectedSample.schoolLevel === 'middle' ? '중학교' : '고등학교'} | {selectedSample.issue} | {selectedSample.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedSample(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6">{selectedSample.summary}</p>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-sm text-gray-600 mb-4">
                  전체 수업 내용은 프리미엄 구독 시 확인하실 수 있습니다.
                </p>
                <Link
                  href="/pricing"
                  className="inline-block bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
                >
                  프리미엄 시작하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
