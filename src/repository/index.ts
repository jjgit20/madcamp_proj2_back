import {AppDataSource} from '@src/AppDataSource';

import {User} from '@src/entity/user.entity';

export const userRepository = AppDataSource.getRepository(User);
