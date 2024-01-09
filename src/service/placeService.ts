import {placeRepository} from 'src/repository';

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
