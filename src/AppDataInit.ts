import {type PlaceCreateDto} from './dto/placeDto';
import {type PlanCreateDto} from './dto/planDto';
import {placeRepository, planRepository, userRepository} from './repository';

const userInit1 = {
  username: 'tester',
  kakaoId: '3258107781',
  password: 'password',
  nickname: '김현아',
  email: 'kimhyuna0321@gmail.com',
  image:
    'https://i.pinimg.com/564x/7e/43/1a/7e431a29fd17def762570f75a056aa13.jpg',
};

const userInit2 = {
  username: 'tester2',
  kakaoId: '3258107782',
  password: 'password',
  nickname: '여행러',
  email: 'kimhyuna0321@gmail.com',
  image:
    'https://i.pinimg.com/564x/7e/66/84/7e6684f737c9163afad557191d0fcab1.jpg',
};

const userInit3 = {
  username: 'tester2',
  kakaoId: '3277747301',
  password: 'password',
  nickname: '장지오',
  email: 'aa@gmail.com',
  image:
    'https://i.pinimg.com/564x/de/3c/6e/de3c6e0c731149aaebd42ef19dae5e12.jpg',
};

const planInit1: PlanCreateDto = {
  userId: 1,
  startDate: new Date('2024-01-12'),
  endDate: new Date('2024-01-14'),
  country: '일본',
  city: '오사카',
  season: '봄',
  topic: '여행',
  airport: '도쿄 국제공항 (하네다)',
  cash: 1239021,
  places: [],
  title: '나의 일본 여행기',
  rating: 5,
  selfReview: '정말 좋은 경험이었고, 빨리 다시 떠나고 싶어요!',
  image:
    'https://i.pinimg.com/564x/65/d6/cd/65d6cdfa3986b3d3a957459eb38b03a9.jpg',
  isComplete: true,
  isPublic: true,
};

const planInit2: PlanCreateDto = {
  ...planInit1,
  startDate: new Date('2024-11-12'),
  endDate: new Date('2024-11-20'),
  country: '한국',
  city: '서울',
  airport: '인천 국제공항',
  image:
    'https://i.pinimg.com/236x/30/dc/f9/30dcf99d076e79e55e519ad4240d2f6c.jpg',
};

const planInit3: PlanCreateDto = {
  ...planInit2,
  userId: 2,
  startDate: new Date('2024-11-12'),
  endDate: new Date('2024-11-20'),
  country: '미국',
  city: '로스앤젤레스',
  airport: '로스앤젤레스 국제공항',
  image:
    'https://i.pinimg.com/564x/99/fd/c7/99fdc7ec45e249c9232343c80bc1eff0.jpg',
};

const planInit4: PlanCreateDto = {
  ...planInit3,
  startDate: new Date('2024-4-12'),
  endDate: new Date('2024-4-20'),
  country: '미국',
  city: '시카고',
  airport: '시카고 오헤어 국제공항',
  image:
    'https://s1.it.atcdn.net/wp-content/uploads/2019/09/IT_LandingPage_HeaderImage_Austria_2019_Sept.jpg',
};

const planInit5: PlanCreateDto = {
  ...planInit4,
  userId: 3,
  startDate: new Date('2024-6-12'),
  endDate: new Date('2024-6-20'),
  country: '대만',
  city: '타이베이',
  airport: '타이중 국제공항',
  image:
    'https://i.pinimg.com/236x/11/27/8c/11278ca780e9e592b03ddb23ef5ddeea.jpg',
};

const planInit6: PlanCreateDto = {
  ...planInit5,
  startDate: new Date('2024-9-21'),
  endDate: new Date('2024-10-2'),
  country: '대만',
  city: '타이베이',
  airport: '타이중 국제공항',
  image:
    'https://i.pinimg.com/236x/4d/bd/b3/4dbdb3a9d2d28f2c9155723c22229b9d.jpg',
};

const placeInit1: PlaceCreateDto = {
  latitude: 35.553333,
  longitude: 139.781113,
  placeType: 'TRANSPORT',
  name: '하네다 공항',
};

const placeInit2: PlaceCreateDto = {
  latitude: 35.6268278,
  longitude: 139.88497817078,
  placeType: 'LANDMARK',
  name: '디즈니씨',
};

export const initPlanData = async () => {
  let newUser = userRepository.create(userInit1);
  let savedUser = await userRepository.save(newUser);

  newUser = userRepository.create(userInit2);
  savedUser = await userRepository.save(newUser);

  newUser = userRepository.create(userInit3);
  savedUser = await userRepository.save(newUser);

  let newPlan = planRepository.create(planInit1);
  let savedPlan: PlanCreateDto = await planRepository.save(newPlan);

  newPlan = planRepository.create(planInit2);
  savedPlan = await planRepository.save(newPlan);

  newPlan = planRepository.create(planInit3);
  savedPlan = await planRepository.save(newPlan);

  newPlan = planRepository.create(planInit4);
  savedPlan = await planRepository.save(newPlan);

  newPlan = planRepository.create(planInit5);
  savedPlan = await planRepository.save(newPlan);

  newPlan = planRepository.create(planInit6);
  savedPlan = await planRepository.save(newPlan);

  let newPlace = placeRepository.create(placeInit1);
  let savedPlace = await placeRepository.save(newPlace);

  newPlace = placeRepository.create(placeInit2);
  savedPlace = await placeRepository.save(newPlace);
};
