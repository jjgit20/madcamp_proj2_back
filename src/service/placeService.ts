import {
  placeRepository,
  planPlaceRepository,
  planRepository,
} from '../repository';

export const getPlace = async (
  latitude: number,
  longitude: number,
  type: string,
  name: string,
) => {
  const place = await placeRepository.findOne({where: {latitude, longitude}});
  if (place !== null) {
    return place;
  } else {
    const newPlace = placeRepository.create({
      latitude,
      longitude,
      placeType: type,
      name,
    });
    const savedPlace = await placeRepository.save(newPlace);
    return savedPlace;
  }
};

export const addPlanPlace = async (
  planId: number,
  placeId: number,
  orderInDay: number,
  visitDate: Date,
) => {
  const plan = await planRepository.findOne({
    where: {planId},
    relations: ['places'],
  });
  const place = await placeRepository.findOne({
    where: {placeId},
  });

  if (plan !== null && place !== null) {
    const planPlace = {
      plan,
      place,
      visitDate,
      orderInDay,
      money: 0,
    };
    const newPlanPlace = planPlaceRepository.create(planPlace);
    const savedPlanPlace = await planPlaceRepository.save(newPlanPlace);

    const changedPlan = await planRepository.findOne({
      where: {planId},
      relations: ['places', 'places.place'],
    });
    return savedPlanPlace;
  } else {
    throw new Error('Unauthorized addPlanPlace');
  }
};

export const deletePlanPlace = async (planPlaceId: number) => {
  const planPlace = await planPlaceRepository.findOne({where: {planPlaceId}});

  if (planPlace !== null) {
    await planPlaceRepository.delete({planPlaceId});
    return planPlace;
  } else {
    throw new Error('Unauthorized deletePlanPlace');
  }
};
