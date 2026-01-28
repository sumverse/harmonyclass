'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MusicalSampleSection from './components/MusicalSampleSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Hero />
      <MusicalSampleSection />
      <ReviewsSection />
      <FAQSection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">harmonyclass</h3>
            <p className="text-gray-400">음악 교사를 위한 수업 아이디어 뉴스레터</p>
          </div>
          
          <div className="mb-6 text-sm text-gray-400">
            <p>📧 contact@harmonyclass.com</p>
            <p className="mt-1">💬 카카오톡: @harmonyclass</p>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-sm text-gray-500">
            <p>© 2026 harmonyclass. All rights reserved.</p>
            <p className="mt-2">Made with 💜 for Music Teachers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
