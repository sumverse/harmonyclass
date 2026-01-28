This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 환경 변수

### 필수 환경 변수

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (프리미엄 결제)
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxx
```

### Stibee 자동 연동 (선택)

회원가입 시 자동으로 Stibee 뉴스레터에 구독자를 추가하고, 결제 시 그룹을 변경합니다.

```bash
# Stibee API 연동
STIBEE_API_KEY=your_stibee_api_key          # 스티비 워크스페이스 설정 → API 키
STIBEE_LIST_ID=your_list_id                  # 주소록 ID (숫자)
STIBEE_GROUP_FREE_ID=your_free_group_id      # 무료 구독자 그룹 ID (선택)
STIBEE_GROUP_PREMIUM_ID=your_premium_group_id # 프리미엄 구독자 그룹 ID (선택)

# 기존 스티비 링크 방식 (API 연동 없이 링크만 제공)
NEXT_PUBLIC_STIBEE_SUBSCRIBE_URL=https://page.stibee.com/subscriptions/xxxxx
```

**Stibee API 키 발급 방법:**
1. [스티비](https://stibee.com) 로그인
2. 워크스페이스 설정 → API 키 → 새 API 키 생성
3. 주소록 → 원하는 주소록 선택 → URL에서 숫자가 LIST_ID

**주의:** 그룹 기능은 스티비 프로 요금제 이상에서만 사용 가능합니다.

### Supabase 테이블 설정

`profiles` 테이블에 다음 컬럼이 필요합니다:

```sql
-- 뉴스레터 구독 관련 컬럼 추가
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS newsletter_subscribed BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS newsletter_tier TEXT; -- 'free' | 'premium'
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stibee_synced_at TIMESTAMPTZ;
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
