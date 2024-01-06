import bcrypt from 'bcryptjs';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import {
  type KakaoSignUpResponse,
  type KakaoLoginResponse,
} from '../dto/kakaoAuthDto';
import {type User} from '../entity/user.entity';
import {userRepository} from '../repository';

const path = require('path');
const privateKeyPath: string = path.join(__dirname, '../certs/private.key');
const privateKey = fs.readFileSync(privateKeyPath);

export const login = async (kakaoId: string): Promise<KakaoLoginResponse> => {
  const user = await userRepository.findOne({
    where: {
      kakaoId,
    },
  });
  const token = jwt.sign(
    {
      userId: user?.userId,
      username: user?.username,
      nickname: user?.nickname,
      email: user?.email,
      image: user?.image,
    },
    privateKey,
    {algorithm: 'RS256', expiresIn: '30d'},
  );

  return {
    signedUp: user !== null,
    userId: user?.userId,
    token,
  };
};

export const signup = async (
  kakaoId: string,
  username: string,
  password: string,
  nickname: string,
  email: string,
  image: string,
): Promise<KakaoSignUpResponse> => {
  const user = userRepository.create({
    kakaoId,
    username,
    password: await bcrypt.hash(password, 10),
    nickname,
    email,
    image,
  });
  const savedUser: User = await userRepository.save(user);
  const token = jwt.sign(
    {
      userId: user?.userId,
      username: user?.username,
      nickname: user?.nickname,
      email: user?.email,
      image: user?.image,
    },
    privateKey,
    {algorithm: 'RS256', expiresIn: '30d'},
  );

  return {
    signedUp: true,
    token,
    userId: savedUser.userId,
    // username: savedUser.username,
    // nickname: savedUser.nickname,
    // email: savedUser.email,
    // image: savedUser.image,
  };
};
