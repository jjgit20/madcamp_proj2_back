import {AppDataSource} from '../AppDataSource';
import {User} from '../entity/user.entity';

export const userRepository = AppDataSource.getRepository(User);
