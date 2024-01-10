import {planRepository, userRepository} from '../repository';

export const getUser = async (userId: number) => {
  const user = await userRepository.findOne({
    where: {
      userId,
    },
    relations: ['plans', 'receivedLikes', 'receivedForks'],
  });
  const userPlanCount = await planRepository.count({
    where: {userId, isPublic: true},
  });

  if (user === null) {
    return null;
  }

  return {
    nickname: user?.nickname,
    image: user?.image,
    plans: userPlanCount,
    receivedLikes:
      user?.receivedLikes?.length !== null ? user?.receivedLikes?.length : 0,
    receivedForks:
      user?.receivedForks?.length !== null ? user?.receivedForks?.length : 0,
  };
};

export const getUserPlans = async (
  tokenUserId: number,
  userId: number,
  page: number,
  limit: number,
) => {
  let plans;
  if (userId === tokenUserId) {
    plans = await planRepository.find({
      where: {userId},
      relations: ['userId', 'forks', 'likes', 'likes.giver'],
      order: {planId: 'ASC'},
      skip: page * 25,
      take: limit,
      select: [
        'planId',
        'startDate',
        'endDate',
        'country',
        'city',
        'forks',
        'likes',
        'image',
        'isPublic',
      ],
    });
  } else {
    plans = await planRepository.find({
      where: {isPublic: true, userId},
      relations: ['userId', 'forks', 'likes', 'likes.giver'],
      order: {planId: 'ASC'},
      skip: page * 25,
      take: limit,
      select: ['planId', 'country', 'forks', 'likes', 'image'],
    });
  }

  // did I like it?
  const plansWithMyLikedStatus = plans.map(plan => {
    const didILikeIt = plan.likes.some(
      like => like.giver.userId === tokenUserId,
    );
    return {...plan, didILikeIt};
  });

  return plansWithMyLikedStatus;
};
