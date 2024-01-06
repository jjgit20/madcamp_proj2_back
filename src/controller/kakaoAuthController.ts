import {type Request, type Response} from 'express';

import {
  type KakaoSignupRequest,
  type KakaoLoginRequest,
} from '../dto/kakaoAuthDto';
import * as kakaoAuthService from '../service/kakaoAuthService';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const {kakaoId}: KakaoLoginRequest = req.body;
    const loginResponse = await kakaoAuthService.login(kakaoId);
    res.json(loginResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: login');
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestBody: KakaoSignupRequest = req.body;
    const signupResponse = await kakaoAuthService.signup(
      requestBody.kakaoId,
      requestBody.username,
      requestBody.password,
      requestBody.nickname,
      requestBody.email,
      requestBody.image,
    );
    res.json(signupResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: signup');
  }
};
