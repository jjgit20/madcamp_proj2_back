import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Plan} from './plan.entity';
import {User} from './user.entity';

@Entity('tb_likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.receivedLikes)
  receiver: User;

  @ManyToOne(() => User, user => user.givenLikes)
  giver: User;

  @ManyToOne(() => Plan, plan => plan.likes)
  plan: Plan;
}
