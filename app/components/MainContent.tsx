'use client';

import { motion } from 'framer-motion';

export default function MainContent() {
  return (
    <>
      {/* Section 1: 문제 제기 */}
      <section id="intro" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* 타이틀 */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center"
          >
            수업 준비, 왜 이렇게 복잡할까요?
          </motion.h2>
          
          {/* 3개 문제 리스트 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="space-y-6 mb-20"
          >
            {[
              '학년마다 성취기준이 달라요',
              '자료는 흩어져 있고 정리는 다시 해야 해요',
              '수업보다 준비에 시간이 더 들어요'
            ].map((text, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl"
              >
                <span className="text-gray-400 font-medium text-lg">•</span>
                <p className="text-gray-700 text-lg">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 2: 전환 문장 */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xl md:text-2xl font-medium text-gray-900"
          >
            그래서, 필요한 건<br className="md:hidden" /> 
            <span className="text-amber-800"> 학년에 맞게 이미 정리된 수업 자료</span>입니다.
          </motion.p>
        </div>
      </section>

      {/* Section 3: 제공 콘텐츠 */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              harmonyclass가 제공하는 것
            </h2>
            <p className="text-gray-600 text-lg">
              매주 월요일, 단 5분이면 충분합니다
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                ),
                title: '학년별 수업안',
                description: '초등, 중등, 고등 각 학교급에 맞춘 40분 수업 흐름',
                color: 'bg-amber-100 text-amber-800'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                ),
                title: '루브릭 & 학습지 세트',
                description: '평가 기준표와 활동지까지 한 번에',
                color: 'bg-blue-100 text-blue-700'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                ),
                title: '바로 쓰는 자료',
                description: '다운받아서 바로 인쇄하거나 수정해서 사용',
                color: 'bg-green-100 text-green-600'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                ),
                title: '최신 교육 트렌드',
                description: 'KOSIS 교육통계 기반 트렌드 분석',
                color: 'bg-purple-100 text-purple-700'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-default"
              >
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
