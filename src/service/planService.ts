import {type LikeCreateDto, type ForkCreateDto} from 'src/dto/forkLikeDto';

import {uploadImage} from '../cloud/cloudFileUploader';
import {type PlanModifyDto, type PlanCreateDto} from '../dto/planDto';
import {type User} from '../entity/user.entity';
import {
  forkRepository,
  likeRepository,
  planRepository,
  userRepository,
} from '../repository';

export const getPlans = async (page: number, limit: number) => {
  const plans = await planRepository.find({
    where: {isPublic: true},
    relations: ['userId', 'forks', 'likes'],
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
    ],
  });
  return plans;
};

export const getOnePlan = async (tokenUserId: number, planId: number) => {
  const plan = await planRepository.findOne({
    where: {planId},
    relations: ['userId', 'forks', 'likes', 'places'],
  });
  if (
    plan !== null &&
    ((plan.userId as unknown as User).userId === tokenUserId || plan.isPublic)
  ) {
    return plan;
  } else {
    throw new Error('Unauthorized getOnePlan');
  }
};

export const createPlan = async (
  tokenUserId: number,
  plan: PlanCreateDto,
  file: Express.Multer.File | undefined,
) => {
  if (file !== undefined) {
    const imageUrl = await uploadImage(tokenUserId, file);
    plan.image = imageUrl;
  }

  plan.userId = tokenUserId;
  const newPlan = planRepository.create(plan);
  const savedPlan: PlanCreateDto = await planRepository.save(newPlan);
  return savedPlan;
};

export const modifyPlan = async (
  tokenUserId: number,
  planId: number,
  planModify: PlanModifyDto,
  file: Express.Multer.File | undefined,
) => {
  if (file !== undefined) {
    const imageUrl = await uploadImage(tokenUserId, file);
    planModify.image = imageUrl;
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
    await planRepository.update({planId}, planModify);
    const updatedPlan = await planRepository.findOne({
      where: {planId},
      relations: ['userId'],
    });
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
  if (
    plan !== null &&
    (plan.userId as unknown as User).userId === tokenUserId
  ) {
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
    (plan.userId as unknown as User).userId === tokenUserId
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

    const changedPlan = await planRepository.findOne({
      where: {planId},
      relations: ['userId', 'forks'],
    });
    return changedPlan;
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
      .leftJoinAndSelect('like.plan', 'plan') // Assuming there's a 'plan' property in the Fork entity
      .leftJoinAndSelect('like.giver', 'giver') // Assuming there's a 'giver' property in the Fork entity
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
