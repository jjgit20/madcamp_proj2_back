import {AppDataSource} from '../AppDataSource';
import {Fork} from '../entity/fork.entity';
import {Like} from '../entity/like.entity';
import {Place} from '../entity/place.entity';
import {Plan} from '../entity/plan.entity';
import {PlanPlace} from '../entity/planPlace.entity';
import {User} from '../entity/user.entity';

export const userRepository = AppDataSource.getRepository(User);
export const planRepository = AppDataSource.getRepository(Plan);
export const forkRepository = AppDataSource.getRepository(Fork);
export const likeRepository = AppDataSource.getRepository(Like);
export const placeRepository = AppDataSource.getRepository(Place);
export const planPlaceRepository = AppDataSource.getRepository(PlanPlace);
