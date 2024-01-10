import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';

import {Fork} from './fork.entity';
import {Like} from './like.entity';
import {Plan} from './plan.entity';

@Entity('tb_users')
@Unique(['username', 'kakaoId'])
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column({nullable: true})
  kakaoId: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  // @Column()
  // phone: string;

  @Column()
  email: string;

  @Column()
  image: string;

  @OneToMany(() => Plan, plan => plan.userId)
  plans: Plan[];

  @OneToMany(() => Fork, fork => fork.receiver)
  receivedForks: Fork[];

  @OneToMany(() => Fork, fork => fork.giver)
  givenForks: Fork[];

  @OneToMany(() => Like, like => like.receiver)
  receivedLikes: Like[];

  @OneToMany(() => Like, like => like.giver)
  givenLikes: Like[];
}
