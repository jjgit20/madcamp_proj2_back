import {AppDataSource} from '../AppDataSource';
import {Plan} from '../entity/plan.entity';
import {User} from '../entity/user.entity';

export const userRepository = AppDataSource.getRepository(User);
export const planRepository = AppDataSource.getRepository(Plan);
