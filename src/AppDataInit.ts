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
    'https://k.kakaocdn.net/dn/Yza2R/btss3Vj963e/pOZiCpWBiiGtTQpkQ6tKe0/img_640x640.jpg',
};

const userInit2 = {
  username: 'tester2',
  kakaoId: '3258107782',
  password: 'password',
  nickname: '김하나',
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
    'https://k.kakaocdn.net/dn/Yza2R/btss3Vj963e/pOZiCpWBiiGtTQpkQ6tKe0/img_640x640.jpg',
};

const planInit1: PlanCreateDto = {
  userId: 1,
  startDate: new Date(),
  endDate: new Date(),
  country: '일본',
  city: '오사카',
  // flightStartDate: new Date(),
  // flightEndDate: new Date(),
  season: '',
  topic: '',
  airport: '??',
  cash: 1239021,
  places: [],
  title: '나의 일본 여행기',
  rating: 1,
  selfReview: '정말 좋았음, 강추',
  image: 'https://www.japan-guide.com/thumb/XYZeXYZe2157_1680.jpg',
};

const planInit2: PlanCreateDto = {
  ...planInit1,
  startDate: new Date('2022-11-12'),
  endDate: new Date('2022-11-20'),
  image:
    'https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2023-05/7-day-itinerary-osaka_key.jpg?itok=kX6hSTDV',
};

const planInit3: PlanCreateDto = {
  ...planInit2,
  image:
    'https://s1.it.atcdn.net/wp-content/uploads/2019/09/IT_LandingPage_HeaderImage_Austria_2019_Sept.jpg',
};

const planInit4: PlanCreateDto = {
  ...planInit2,
  userId: 3,
  image:
    'https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2023-05/7-day-itinerary-osaka_key.jpg?itok=kX6hSTDV',
};

const planInit5: PlanCreateDto = {
  ...planInit2,
  userId: 3,
  image:
    'https://s1.it.atcdn.net/wp-content/uploads/2019/09/IT_LandingPage_HeaderImage_Austria_2019_Sept.jpg',
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

  let newPlace = placeRepository.create(placeInit1);
  let savedPlace = await placeRepository.save(newPlace);

  newPlace = placeRepository.create(placeInit2);
  savedPlace = await placeRepository.save(newPlace);
};
