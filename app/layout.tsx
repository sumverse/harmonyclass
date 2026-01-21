import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
