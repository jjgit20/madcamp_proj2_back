import {type PlanModifyDto, type PlanCreateDto} from '../dto/planDto';
import {Plan} from '../entity/plan.entity';
import {planRepository} from '../repository';

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
      'userId',
      'image',
    ],
  });
  // const plans = await planRepository
  //   .createQueryBuilder('plan')
  //   .where('plan.public = :isPublic', {isPublic: true})
  //   .leftJoinAndSelect('plan.userId', 'userId')
  //   .select([
  //     'plan.planId',
  //     'plan.country',
  //     'plan.city',
  //     'plan.rating',
  //     'plan.forks',
  //     'plan.likes',
  //     'userId.userId',
  //     'userId.image',
  //   ])
  //   .skip(page * 25)
  //   .take(limit)
  //   .getMany();
  return plans;
};

export const getOnePlan = async (planId: number) => {
  const plan = await planRepository.findOne({where: {planId}});
  return plan;
};

export const createPlan = async (plan: PlanCreateDto) => {
  const newPlan = planRepository.create(plan);
  const savedPlan: PlanCreateDto = await planRepository.save(newPlan);
  return savedPlan;
};

export const modifyPlanPublic = async (planId: number) => {
  const plan = await planRepository.findOne({where: {planId}});
  if (plan !== null) {
    await planRepository.update({planId}, {isPublic: !plan.isPublic});
  }
  // await planRepository
  //   .createQueryBuilder('plan')
  //   .update(Plan)
  //   .set({isPublic: () => 'NOT plan.isPublic'})
  //   .where('planId = :planId', {planId})
  //   .execute();
};

export const modifyPlan = async (planId: number, planModify: PlanModifyDto) => {
  const updateQuery = planRepository.createQueryBuilder('plan').update(Plan);
  Object.keys(planModify).forEach(key => {
    updateQuery.set({[key]: () => planModify[key as keyof PlanModifyDto]});
  });
  await updateQuery.where('planId = :planId', {planId}).execute();
};
