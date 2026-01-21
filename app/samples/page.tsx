'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SamplesPage() {
  const [schoolLevel, setSchoolLevel] = useState('middle');
  const [category, setCategory] = useState('all');
  const [selectedSample, setSelectedSample] = useState<any>(null);

  const samples = [
    {
      id: 1,
      title: '뮤지컬의 역사와 특징',
      schoolLevel: 'middle',
      categories: ['가창/합창', '디지털/에듀테크'],
      issue: '#23',
      date: '2026.01.20',
      summary: '중학교 뮤지컬 수업 - 뮤지컬 넘버 배우고 메타버스 박물관 만들기 (3차시)',
    },
    {
      id: 2,
      title: '뮤지컬의 역사와 특징 (심화)',
      schoolLevel: 'high',
      categories: ['가창/합창', '디지털/에듀테크'],
      issue: '#23',
      date: '2026.01.20',
      summary: '고등학교 뮤지컬 수업 - 고난이도 넘버 배우고 Spotvirtual로 도서관 만들기 (4차시)',
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">수업 자료 아카이브</h1>
        <p className="text-gray-600 mb-8">과거 발송된 모든 뉴스레터를 확인하실 수 있습니다</p>

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
                <p className="text-gray-600 mt-2">{selectedSample.schoolLevel === 'middle' ? '중학교' : '고등학교'} | {selectedSample.issue} | {selectedSample.date}</p>
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
