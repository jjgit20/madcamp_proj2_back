export interface KakaoLoginRequest {
  kakaoId: string;
}

export interface KakaoLoginResponse {
  signedUp: boolean;
  userId: number | undefined;
  username: string | undefined;
  nickname: string | undefined;
  email: string | undefined;
  image: string | undefined;
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
  userId: number;
  username: string;
  nickname: string;
  email: string;
  image: string;
}
