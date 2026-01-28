// Stibee API 헬퍼 함수
// 문서: https://api.stibee.com/docs

const STIBEE_API_URL = 'https://api.stibee.com/v1';

interface StibeeSubscriber {
  email: string;
  name?: string;
  groupIds?: number[];
  // 사용자 정의 필드 (필요 시 추가)
  [key: string]: string | number | number[] | undefined;
}

interface StibeeResponse {
  Ok: boolean;
  Error?: {
    Code: string;
    Message: string;
  };
  Value?: unknown;
}

// API 키 확인
function getApiKey(): string {
  const apiKey = process.env.STIBEE_API_KEY;
  if (!apiKey) {
    throw new Error('STIBEE_API_KEY 환경변수가 설정되지 않았습니다.');
  }
  return apiKey;
}

// 주소록 ID 확인
function getListId(): string {
  const listId = process.env.STIBEE_LIST_ID;
  if (!listId) {
    throw new Error('STIBEE_LIST_ID 환경변수가 설정되지 않았습니다.');
  }
  return listId;
}

// 공통 fetch 함수
async function stibeeFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<StibeeResponse> {
  const apiKey = getApiKey();
  
  const response = await fetch(`${STIBEE_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'AccessToken': apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Stibee API 오류: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * 구독자 추가/업데이트
 * - 이미 존재하는 이메일이면 정보 업데이트
 * - 새 이메일이면 구독자 추가
 */
export async function addSubscriber(
  email: string,
  name?: string,
  groupIds?: number[]
): Promise<StibeeResponse> {
  const listId = getListId();
  
  const subscriber: StibeeSubscriber = {
    email,
    ...(name && { name }),
    ...(groupIds && { groupIds }),
  };

  return stibeeFetch(`/lists/${listId}/subscribers`, {
    method: 'POST',
    body: JSON.stringify({
      eventOccuredBy: 'MANUAL',
      confirmEmailYN: 'N', // 이미 회원가입 시 이메일 인증했으므로 스킵
      subscribers: [subscriber],
    }),
  });
}

/**
 * 구독자 삭제 (구독 취소)
 */
export async function removeSubscriber(email: string): Promise<StibeeResponse> {
  const listId = getListId();
  
  return stibeeFetch(`/lists/${listId}/subscribers`, {
    method: 'DELETE',
    body: JSON.stringify({
      subscribers: [email],
    }),
  });
}

/**
 * 구독자 정보 조회
 */
export async function getSubscriber(email: string): Promise<StibeeResponse> {
  const listId = getListId();
  
  return stibeeFetch(`/lists/${listId}/subscribers?s=${encodeURIComponent(email)}`);
}

/**
 * 구독자 그룹 변경 (프리미엄 업그레이드 등)
 * - 기존 그룹에서 제거하고 새 그룹에 추가
 */
export async function updateSubscriberGroups(
  email: string,
  newGroupIds: number[]
): Promise<StibeeResponse> {
  const listId = getListId();
  
  return stibeeFetch(`/lists/${listId}/subscribers`, {
    method: 'POST',
    body: JSON.stringify({
      eventOccuredBy: 'MANUAL',
      confirmEmailYN: 'N',
      subscribers: [{
        email,
        groupIds: newGroupIds,
      }],
    }),
  });
}

/**
 * 그룹에 구독자 추가
 */
export async function addToGroup(
  groupId: number,
  emails: string[]
): Promise<StibeeResponse> {
  const listId = getListId();
  
  return stibeeFetch(`/lists/${listId}/groups/${groupId}/subscribers/assign`, {
    method: 'POST',
    body: JSON.stringify({
      subscribers: emails,
    }),
  });
}

/**
 * 그룹에서 구독자 제거
 */
export async function removeFromGroup(
  groupId: number,
  emails: string[]
): Promise<StibeeResponse> {
  const listId = getListId();
  
  return stibeeFetch(`/lists/${listId}/groups/${groupId}/subscribers/release`, {
    method: 'POST',
    body: JSON.stringify({
      subscribers: emails,
    }),
  });
}

// 그룹 ID 상수 (스티비에서 생성한 그룹 ID로 변경 필요)
export const STIBEE_GROUPS = {
  FREE: Number(process.env.STIBEE_GROUP_FREE_ID) || 0,
  PREMIUM: Number(process.env.STIBEE_GROUP_PREMIUM_ID) || 0,
};

