import {type Plan} from '../entity/plan.entity';
import {type User} from '../entity/user.entity';

export interface ForkCreateDto {
  receiver: User;
  giver: User;
  plan: Plan;
}

export interface LikeCreateDto {
  receiver: User;
  giver: User;
  plan: Plan;
}
