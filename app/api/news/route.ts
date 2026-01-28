import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  // URL에서 keyword 파라미터 가져오기 (기본값: 음악교육)
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('keyword') || '음악교육';

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'API keys not configured' },
      { status: 500 }
    );
  }

  try {
    // 네이버 뉴스 검색 API 호출
    const response = await fetch(
      `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(keyword)}&display=5&sort=date`,
      {
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();

    // 데이터 가공
    const news = data.items.map((item: any, index: number) => ({
      id: index + 1,
      title: item.title.replace(/<[^>]*>/g, ''), // HTML 태그 제거
      description: item.description.replace(/<[^>]*>/g, ''),
      link: item.link,
      pubDate: new Date(item.pubDate).toLocaleDateString('ko-KR'),
      source: item.originallink?.split('/')[2] || '네이버뉴스',
    }));

    return NextResponse.json(news);
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
