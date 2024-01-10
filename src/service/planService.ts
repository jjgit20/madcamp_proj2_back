import {type PlanPlace} from 'src/entity/planPlace.entity';
import {Like} from 'typeorm';

import {uploadImage} from '../cloud/cloudFileUploader';
import {type LikeCreateDto, type ForkCreateDto} from '../dto/forkLikeDto';
import {
  type PlanModifyDto,
  type PlanCreateDto,
  type PlanModifyQueryDto,
} from '../dto/planDto';
import {type Plan} from '../entity/plan.entity';
import {type User} from '../entity/user.entity';
import {
  forkRepository,
  likeRepository,
  planPlaceRepository,
  planRepository,
  userRepository,
} from '../repository';

export const getPlans = async (
  tokenUserId: number,
  page: number,
  limit: number,
  search: string,
) => {
  let plans;
  if (search) {
    plans = await planRepository.find({
      where: [
        {isPublic: true, country: Like(`%${search}%`)},
        {isPublic: true, city: Like(`%${search}%`)},
        {isPublic: true, airport: Like(`%${search}%`)},
      ],
      relations: ['userId', 'forks', 'likes', 'likes.giver'],
      order: {planId: 'ASC'},
      skip: page * 25,
      take: limit,
      select: [
        'planId',
        'country',
        'city',
        'rating',
        'forks',
        'likes',
        'image',
        'userId',
        'forks',
        'likes',
        'cash',
        'startDate',
        'endDate',
      ],
    });
  } else {
    plans = await planRepository.find({
      where: {isPublic: true},
      relations: ['userId', 'forks', 'likes', 'likes.giver'],
      order: {planId: 'ASC'},
      skip: page * 25,
      take: limit,
      select: [
        'planId',
        'country',
        'city',
        'rating',
        'forks',
        'likes',
        'image',
        'userId',
        'forks',
        'likes',
        'cash',
        'startDate',
        'endDate',
      ],
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

export const getOnePlan = async (tokenUserId: number, planId: number) => {
  const plan = await planRepository.findOne({
    where: {planId},
    relations: [
      'userId',
      'forks',
      'likes',
      'likes.giver',
      'places',
      'places.place',
    ],
  });
  if (
    plan !== null &&
    ((plan.userId as unknown as User).userId === tokenUserId || plan.isPublic)
  ) {
    // did I like it?
    const didILikeIt = plan.likes.some(
      like => like.giver.userId === tokenUserId,
    );

    return {...plan, didILikeIt};
  } else {
    throw new Error('Unauthorized getOnePlan');
  }
};

export const createPlan = async (
  tokenUserId: number,
  plan: PlanCreateDto,
  file: Express.Multer.File | undefined,
) => {
  if (plan.image === 'null') {
    plan.image = undefined;
  }

  if (file !== undefined) {
    const imageUrl = await uploadImage(tokenUserId, file);
    if (imageUrl !== 'null') {
      plan.image = imageUrl;
    }
  }

  plan.userId = tokenUserId;
  const startDate = new Date(parseInt(plan.startDate as string));
  const endDate = new Date(parseInt(plan.endDate as string));
  const newPlan = planRepository.create({
    ...plan,
    startDate,
    endDate,
  });
  const savedPlan = await planRepository.save(newPlan);
  return savedPlan;
};

export const modifyPlan = async (
  tokenUserId: number,
  planId: number,
  planModify: PlanModifyDto,
  file: Express.Multer.File | undefined,
) => {
  if (planModify.image === 'null') {
    planModify.image = undefined;
  }

  if (file !== undefined) {
    const imageUrl = await uploadImage(tokenUserId, file);
    if (imageUrl !== 'null') {
      planModify.image = imageUrl;
    }
  }

  const plan = await planRepository.findOne({
    where: {planId},
    relations: ['userId'],
  });
  // const plan = await planRepository
  //   .createQueryBuilder('plan')
  //   .where('plan.planId = :planId', {planId})
  //   .leftJoin('plan.userId', 'userId')
  //   .select(['plan.planId', 'userId.userId'])
  //   .getOne();
  if (
    plan !== null &&
    (plan.userId as unknown as User).userId === tokenUserId &&
    !plan.isComplete
  ) {
    const startDate = new Date(parseInt(planModify.startDate as string));
    const endDate = new Date(parseInt(planModify.endDate as string));
    const allowedProperties = [
      'startDate',
      'endDate',
      'country',
      'city',
      'flightStartDate',
      'flightEndDate',
      'airport',
      'cash',
      'title',
      'rating',
      'selfReview',
      'image',
    ];
    const filteredPlanModify: any = {};

    Object.keys(planModify).forEach(key => {
      if (
        allowedProperties.includes(key as keyof Plan) &&
        planModify[key as keyof PlanModifyDto] !== undefined &&
        planModify[key as keyof PlanModifyDto] !== 'null'
      ) {
        if (key === 'startDate') {
          filteredPlanModify.startDate = new Date(
            parseInt(planModify[key] as string),
          );
        } else if (key === 'endDate') {
          filteredPlanModify.endDate = new Date(
            parseInt(planModify[key] as string),
          );
        } else {
          filteredPlanModify[key as keyof PlanModifyDto] = planModify[
            key as keyof PlanModifyDto
          ] as any;
        }
      }
    });

    await planRepository.update(
      {planId},
      filteredPlanModify as PlanModifyQueryDto,
    );
    const updatedPlan = await planRepository.findOne({
      where: {planId},
      relations: ['userId'],
    });

    // update planplaces
    const planPlaces = planModify.places;
    if (planPlaces) {
      for (const planPlace of JSON.parse(planPlaces) as PlanPlace[]) {
        await planPlaceRepository.update(
          {planPlaceId: planPlace.planPlaceId},
          planPlace,
        );
      }
    }

    return updatedPlan;
  } else {
    throw new Error('Unauthorized modifyPlan');
  }
};

export const deletePlan = async (tokenUserId: number, planId: number) => {
  const plan = await planRepository.findOne({
    where: {planId},
    relations: ['userId'],
  });
  const planPlaces = await planPlaceRepository.find({where: {plan: {planId}}});
  if (
    plan !== null &&
    (plan.userId as unknown as User).userId === tokenUserId
  ) {
    for (const planPlace of planPlaces) {
      await planPlaceRepository.delete({planPlaceId: planPlace.planPlaceId});
    }
    await planRepository.delete({planId});
    return plan;
  } else {
    throw new Error('Unauthorized deletePlan');
  }
};

export const modifyPlanPublic = async (tokenUserId: number, planId: number) => {
  const plan = await planRepository.findOne({
    where: {planId},
    relations: ['userId'],
  });
  if (
    plan !== null &&
    (plan.userId as unknown as User).userId === tokenUserId &&
    plan.isComplete
  ) {
    await planRepository.update({planId}, {isPublic: !plan.isPublic});
    const updatedPlan = await planRepository.findOne({where: {planId}});
    return updatedPlan;
  } else {
    throw new Error('Unauthorized modifyPlanPublic');
  }
};

export const modifyPlanComplete = async (
  tokenUserId: number,
  planId: number,
) => {
  const plan = await planRepository.findOne({
    where: {planId},
    relations: ['userId'],
  });
  if (
    plan !== null &&
    (plan.userId as unknown as User).userId === tokenUserId
  ) {
    await planRepository.update({planId}, {isComplete: true});
    const updatedPlan = await planRepository.findOne({where: {planId}});
    return updatedPlan;
  } else {
    throw new Error('Unauthorized modifyPlanComplete');
  }
};

export const forkPlan = async (tokenUserId: number, planId: number) => {
  const plan = await planRepository.findOne({
    where: {planId},
    relations: ['userId', 'forks'],
  });
  const giver = await userRepository.findOne({
    where: {userId: tokenUserId},
  });

  if (plan !== null && giver !== null) {
    const fork: ForkCreateDto = {
      receiver: plan.userId as unknown as User,
      giver,
      plan,
    };
    const newFork = forkRepository.create(fork);
    const savedFork: ForkCreateDto = await forkRepository.save(newFork);

    const planCopy = await planRepository.findOne({
      where: {planId},
      relations: ['userId'],
    });
    if (planCopy === null) {
      return null;
    }
    const clonedPlan: Partial<Plan> = {...planCopy};
    clonedPlan.userId = tokenUserId;
    clonedPlan.planId = undefined;
    clonedPlan.isComplete = false;
    clonedPlan.isPublic = false;
    clonedPlan.image = undefined;
    clonedPlan.selfReview = undefined;
    clonedPlan.rating = undefined;
    const newPlan = planRepository.create(clonedPlan);
    const savedPlan = await planRepository.save(newPlan);

    const planPlaces = await planPlaceRepository.find({
      where: {plan: {planId}},
      relations: ['plan', 'place'],
    });
    for (const planPlace of planPlaces) {
      const clonedPlanPlace: Partial<PlanPlace> = {...planPlace};
      if (clonedPlanPlace.plan !== undefined) {
        clonedPlanPlace.plan.planId = savedPlan.planId;
      }
      clonedPlanPlace.planPlaceId = undefined;
      const newPlanPlace = planPlaceRepository.create(clonedPlanPlace);
      const savedPlanPlace = await planPlaceRepository.save(newPlanPlace);
    }

    const updatedPlan = await planRepository.findOne({
      where: {planId: savedPlan.planId},
      relations: ['likes', 'forks', 'places'],
    });
    return updatedPlan;
  } else {
    throw new Error('Unauthorized forkPlan');
  }
};

export const likePlan = async (tokenUserId: number, planId: number) => {
  const plan = await planRepository.findOne({
    where: {planId},
    relations: ['userId', 'likes'],
  });
  const giver = await userRepository.findOne({
    where: {userId: tokenUserId},
  });

  if (plan !== null && giver !== null) {
    const oldLike = await likeRepository
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.plan', 'plan')
      .leftJoinAndSelect('like.giver', 'giver')
      .where('plan.planId = :planId', {planId})
      .andWhere('giver.userId = :tokenUserId', {tokenUserId})
      .getOne();

    if (oldLike !== null) {
      await likeRepository.delete({id: oldLike.id});
    } else {
      const like: LikeCreateDto = {
        receiver: plan.userId as unknown as User,
        giver,
        plan,
      };
      const newFork = likeRepository.create(like);
      const savedLike: LikeCreateDto = await likeRepository.save(newFork);
    }

    const changedPlan = await planRepository.findOne({
      where: {planId},
      relations: ['userId', 'likes'],
    });
    return changedPlan;
  } else {
    throw new Error('Unauthorized likePlan');
  }
};
