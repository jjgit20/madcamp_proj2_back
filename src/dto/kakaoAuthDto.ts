export interface KakaoLoginRequest {
  kakaoId: string;
}

export interface KakaoLoginResponse {
  signedUp: boolean;
  userId: number | undefined;
  token: string | null;
  // username: string | undefined;
  // nickname: string | undefined;
  // email: string | undefined;
  // image: string | undefined;
}

export interface KakaoSignupRequest {
  kakaoId: string;
  username: string;
  password: string;
  nickname: string;
  email: string;
  image: string;
}

export interface KakaoSignUpResponse {
  signedUp: boolean;
  userId: number | undefined;
  token: string | null;
  // userId: number;
  // username: string;
  // nickname: string;
  // email: string;
  // image: string;
}
