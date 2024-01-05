import {type User} from '../entity/user.entity';
import {
  type KakaoSignUpResponse,
  type KakaoLoginResponse,
} from '../dto/kakaoAuthDto';
import {userRepository} from '../repository';
import bcrypt from 'bcryptjs';

export const login = async (kakaoId: string): Promise<KakaoLoginResponse> => {
  const user = await userRepository.findOne({
    where: {
      kakaoId,
    },
  });
  return {
    signedUp: user !== null,
    userId: user?.userId,
    username: user?.username,
    nickname: user?.nickname,
    email: user?.email,
    image: user?.image,
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

  return {
    userId: savedUser.userId,
    username: savedUser.username,
    nickname: savedUser.nickname,
    email: savedUser.email,
    image: savedUser.image,
  };
};
