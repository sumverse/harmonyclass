'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MusicalSampleSection() {
  const [activeTab, setActiveTab] = useState<'middle' | 'high'>('middle');

  return (
    <section id="sample" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          이런 내용을 받으실 수 있어요
        </h2>
        <p className="text-gray-600 text-center mb-12 text-lg">
          실제 뉴스레터 샘플 미리보기
        </p>

        {/* 탭 */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('middle')}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition ${
              activeTab === 'middle'
                ? 'bg-amber-800 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            중학교
          </button>
          <button
            onClick={() => setActiveTab('high')}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition ${
              activeTab === 'high'
                ? 'bg-amber-800 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            고등학교
          </button>
        </div>

        {/* 중학교 내용 */}
        {activeTab === 'middle' && (
          <div className="space-y-6">
            {/* 1차시 - 선명 */}
            <div className="bg-gradient-to-br from-blue-50 to-amber-50 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="text-sm text-gray-500 mb-2">중학교 뮤지컬 수업 - 1차시</div>
                  <div className="text-xs text-gray-400">뮤지컬의 역사와 특징</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">📚 수업 목표</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>뮤지컬의 기원과 발전 과정을 설명할 수 있다</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>뮤지컬의 주요 구성 요소(음악, 연기, 춤)를 구분하고 설명할 수 있다</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>대표적인 뮤지컬 작품의 특징을 설명할 수 있다</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">⏱️ 수업 흐름 (45분)</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex gap-3">
                        <span className="text-sm font-semibold text-gray-900 min-w-[80px]">도입 (10분)</span>
                        <span className="text-sm text-gray-700">뮤지컬 영상 감상 및 흥미 유발</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-sm font-semibold text-gray-900 min-w-[80px]">전개 (30분)</span>
                        <span className="text-sm text-gray-700">뮤지컬 역사, 구성 요소, 작품 분석</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-sm font-semibold text-gray-900 min-w-[80px]">정리 (5분)</span>
                        <span className="text-sm text-gray-700">정리 및 다음 차시 안내</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>추천 작품:</strong> 맘마미아, 빨래(참 예뻐요), 캣츠(Memory), 위키드(Popular)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2차시 - 흐릿 */}
            <div className="relative bg-gradient-to-br from-blue-50 to-amber-50 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="blur-sm bg-white p-8 rounded-2xl shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="text-sm text-gray-500 mb-2">중학교 뮤지컬 수업 - 2차시</div>
                  <div className="text-xs text-gray-400">뮤지컬 유명 넘버 배우기</div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700">맘마미아, 캣츠 Memory, 빨래 참 예뻐요 등...</p>
                  <p className="text-gray-700">학생 선택형 넘버 배우기 활동...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 px-8 py-6 rounded-2xl shadow-xl text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">프리미엄 전용</h4>
                  <p className="text-gray-600 mb-2 font-medium">뮤지컬 유명 넘버 배우기</p>
                  <p className="text-sm text-gray-500 mb-4">(맘마미아, 캣츠 Memory, 빨래 참 예뻐요 등 선택하여 배우기)</p>
                  <button className="bg-amber-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-900 transition">
                    프리미엄 시작하기
                  </button>
                </div>
              </div>
            </div>

            {/* 3차시 - 흐릿 */}
            <div className="relative bg-gradient-to-br from-blue-50 to-amber-50 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="blur-sm bg-white p-8 rounded-2xl shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="text-sm text-gray-500 mb-2">중학교 뮤지컬 수업 - 3차시</div>
                  <div className="text-xs text-gray-400">북크리에이터로 팜플렛 만들기</div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700">내가 선택한 뮤지컬 넘버 소개...</p>
                  <p className="text-gray-700">북크리에이터 활용 디지털 팜플렛 제작...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 px-8 py-6 rounded-2xl shadow-xl text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">프리미엄 전용</h4>
                  <p className="text-gray-600 mb-2 font-medium">북크리에이터로 팜플렛 만들기</p>
                  <p className="text-sm text-gray-500 mb-4">(내가 선택한 뮤지컬 넘버를 소개하는 디지털 팜플렛 제작)</p>
                  <button className="bg-amber-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-900 transition">
                    프리미엄 시작하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 고등학교 내용 */}
        {activeTab === 'high' && (
          <div className="space-y-6">
            {/* 1차시 - 선명 */}
            <div className="bg-gradient-to-br from-blue-50 to-amber-50 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="text-sm text-gray-500 mb-2">고등학교 뮤지컬 수업 - 1차시</div>
                  <div className="text-xs text-gray-400">뮤지컬의 역사와 특징</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">📚 수업 목표</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>뮤지컬의 기원과 발전 과정을 설명할 수 있다</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>뮤지컬의 주요 구성 요소(음악, 연기, 춤)를 구분하고 설명할 수 있다</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>대표적인 뮤지컬 작품의 특징을 설명할 수 있다</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">⏱️ 수업 흐름 (45분)</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex gap-3">
                        <span className="text-sm font-semibold text-gray-900 min-w-[80px]">도입 (5분)</span>
                        <span className="text-sm text-gray-700">뮤지컬 영상 감상 및 흥미 유발</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-sm font-semibold text-gray-900 min-w-[80px]">전개 (35분)</span>
                        <span className="text-sm text-gray-700">뮤지컬 역사, 구성 요소, 작품 심화 분석</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-sm font-semibold text-gray-900 min-w-[80px]">정리 (5분)</span>
                        <span className="text-sm text-gray-700">정리 및 다음 차시 안내</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>추천 작품:</strong> 위키드(Defying Gravity), 오페라의 유령, 렌트(Seasons of Love), 레미제라블
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2차시 - 흐릿 */}
            <div className="relative bg-gradient-to-br from-blue-50 to-amber-50 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="blur-sm bg-white p-8 rounded-2xl shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="text-sm text-gray-500 mb-2">고등학교 뮤지컬 수업 - 2차시</div>
                  <div className="text-xs text-gray-400">뮤지컬 유명 넘버 배우기 (심화)</div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700">Defying Gravity, 오페라의 유령, 렌트 등...</p>
                  <p className="text-gray-700">고난이도 넘버 배우기 활동...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 px-8 py-6 rounded-2xl shadow-xl text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">프리미엄 전용</h4>
                  <p className="text-gray-600 mb-2 font-medium">뮤지컬 고난이도 넘버 배우기</p>
                  <p className="text-sm text-gray-500 mb-4">(Defying Gravity, 오페라의 유령, 렌트 Seasons of Love 등)</p>
                  <button className="bg-amber-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-900 transition">
                    프리미엄 시작하기
                  </button>
                </div>
              </div>
            </div>

            {/* 3차시 - 흐릿 */}
            <div className="relative bg-gradient-to-br from-blue-50 to-amber-50 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="blur-sm bg-white p-8 rounded-2xl shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="text-sm text-gray-500 mb-2">고등학교 뮤지컬 수업 - 3차시</div>
                  <div className="text-xs text-gray-400">북크리에이터로 팜플렛 만들기</div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700">내가 선택한 뮤지컬 넘버 소개...</p>
                  <p className="text-gray-700">북크리에이터 활용 디지털 팜플렛 제작...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 px-8 py-6 rounded-2xl shadow-xl text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">프리미엄 전용</h4>
                  <p className="text-gray-600 mb-2 font-medium">북크리에이터로 팜플렛 만들기</p>
                  <p className="text-sm text-gray-500 mb-4">(내가 선택한 뮤지컬 넘버를 소개하는 디지털 팜플렛 제작)</p>
                  <button className="bg-amber-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-900 transition">
                    프리미엄 시작하기
                  </button>
                </div>
              </div>
            </div>

            {/* 4차시 - 흐릿 */}
            <div className="relative bg-gradient-to-br from-blue-50 to-amber-50 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="blur-sm bg-white p-8 rounded-2xl shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="text-sm text-gray-500 mb-2">고등학교 뮤지컬 수업 - 4차시</div>
                  <div className="text-xs text-gray-400">Spotvirtual로 메타버스 도서관 만들기</div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700">나만의 뮤지컬 방/도서관 만들기...</p>
                  <p className="text-gray-700">Spotvirtual로 서로 탐방하기...</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 px-8 py-6 rounded-2xl shadow-xl text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">프리미엄 전용</h4>
                  <p className="text-gray-600 mb-2 font-medium">Spotvirtual로 메타버스 도서관 만들기</p>
                  <p className="text-sm text-gray-500 mb-4">(나만의 뮤지컬 방/도서관을 만들고 서로 탐방하기)</p>
                  <button className="bg-amber-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-900 transition">
                    프리미엄 시작하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            href="/samples"
            className="inline-block bg-amber-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-900 transition shadow-lg"
          >
            수업 자료 더보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
