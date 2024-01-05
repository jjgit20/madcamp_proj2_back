import {User} from '../entity/user.entity';
import {AppDataSource} from '../AppDataSource';

export const userRepository = AppDataSource.getRepository(User);
