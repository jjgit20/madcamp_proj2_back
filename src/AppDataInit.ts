import * as path from 'path';
import {DataSource} from 'typeorm';

import {Plan} from './entity/plan.entity';
import * as planService from './service/planService';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '/entity/*.ts')],
  synchronize: process.env.MIGRATIONS === 'true', // Indicates if database schema should be auto created on every application launch. Be careful with this option and don't use this in production - otherwise you can lose production data.
});

const planRepository = AppDataSource.getRepository(Plan);

const userInit1 = {
  username: 'tester',
  kakaoId: 3258107781,
  password: 'password',
  nickname: '김현아',
  email: 'kimhyuna0321@gmail.com',
  image:
    'https://k.kakaocdn.net/dn/Yza2R/btss3Vj963e/pOZiCpWBiiGtTQpkQ6tKe0/img_640x640.jpg',
};

const planInit1 = {
  userId: 1,
  startDate: 1704546310,
  endDate: 1704546310,
  country: '일본',
  city: '오사카',
  flightStartDate: 1704546310,
  flightEndDate: 1704546310,
  airport: '??',
  cash: 1239021,
  places: [],
  title: '나의 일본 여행기',
  rating: 1,
  selfReview: '정말 좋았음, 강추',
  forkCount: 1000000,
  public: true,
  image:
    'https://img.kbs.co.kr/kbs/620/news.kbs.co.kr/data/fckeditor/new/image/2021/05/07/314691620354493423.jpg',
};

const planInit2 = {
  userId: 1,
  startDate: 1704546310,
  endDate: 1704546310,
  country: '일본',
  city: '오사카',
  flightStartDate: 1704546310,
  flightEndDate: 1704546310,
  airport: '??',
  cash: 1239021,
  places: [],
  title: '나의 일본 여행기',
  rating: 1,
  selfReview: '정말 좋았음, 강추',
  forkCount: 1000000,
  public: true,
  image:
    'https://contents.verygoodtour.com/event/2023/12/1215_vietnam/mobile/images/cover1.jpg',
};

export const initPlanData = async () => {
  await planService.createPlan(planInit1);
  await planService.createPlan(planInit2);
};

initPlanData();
