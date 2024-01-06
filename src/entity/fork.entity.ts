import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Plan} from './plan.entity';
import {User} from './user.entity';

@Entity('tb_forks')
export class Fork {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.receivedForks)
  receiver: User;

  @ManyToOne(() => User, user => user.givenForks)
  giver: User;

  @ManyToOne(() => Plan, plan => plan.forks)
  plan: Plan;
}
