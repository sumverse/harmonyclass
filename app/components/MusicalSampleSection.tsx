'use client';

import { useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

const KEYWORDS = [
  { id: 'music', label: '음악교육', query: '음악교육' },
  { id: 'art', label: '예술교육', query: '예술교육' },
  { id: 'edu', label: '교육정책', query: '교육정책' },
  { id: 'digital', label: '에듀테크', query: '에듀테크 교육' },
];

export default function MusicalSampleSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeKeyword, setActiveKeyword] = useState(KEYWORDS[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/news?keyword=${encodeURIComponent(activeKeyword.query)}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setNews(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError('뉴스를 불러오는데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNews();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchNews();
  }, [activeKeyword]);

  return (
    <section id="sample" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="font-title text-3xl md:text-4xl font-bold text-gray-900">
            교육 최신 뉴스
          </h2>
          <button
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
            className="p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
            title="새로고침"
          >
            <svg 
              className={`w-6 h-6 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 text-center mb-8 text-lg">
          교육 관련 최신 소식을 한눈에
        </p>

        {/* 키워드 탭 */}
        <div className="grid grid-cols-2 md:flex md:justify-center gap-3 mb-8 max-w-md md:max-w-none mx-auto">
          {KEYWORDS.map((keyword) => (
            <button
              key={keyword.id}
              onClick={() => setActiveKeyword(keyword)}
              className={`px-6 py-2 rounded-full font-semibold transition-all text-center ${
                activeKeyword.id === keyword.id
                  ? 'bg-[#2C3E50] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {keyword.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C3E50]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-gray-500">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-amber-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-[#2C3E50]">
                        뉴스
                      </span>
                      <span className="text-xs text-gray-400">{item.source}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#2C3E50] transition">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-gray-400">{item.pubDate}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            네이버 뉴스 API 기반 · 실시간 업데이트
          </p>
        </div>
      </div>
    </section>
  );
}
