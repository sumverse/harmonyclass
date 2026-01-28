import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'harmonyclass - 음악 수업이 쉬워지는 주간 뉴스레터',
  description: '매주 월요일 오전 8시, 바로 쓸 수 있는 수업 아이디어가 당신의 이메일로 찾아갑니다',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        
        {/* MailerLite Universal */}
        <Script id="mailerlite-universal" strategy="lazyOnload">
          {`
            (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '2070355');
          `}
        </Script>
      </body>
    </html>
  )
}
