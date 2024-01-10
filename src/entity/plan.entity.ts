import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {Fork} from './fork.entity';
import {Like} from './like.entity';
import {PlanPlace} from './planPlace.entity';
import {User} from './user.entity';

@Entity('tb_plans')
export class Plan {
  @PrimaryGeneratedColumn()
  planId: number;

  @ManyToOne(() => User, user => user.plans)
  @JoinColumn({name: 'userId'})
  userId: number;

  @Column({type: 'timestamp'})
  startDate: Date;

  @Column({type: 'timestamp'})
  endDate: Date;

  @Column({nullable: true})
  country: string;

  @Column({nullable: true})
  city: string;

  // @Column({type: 'timestamp', nullable: true})
  // flightStartDate: Date;

  // @Column({type: 'timestamp', nullable: true})
  // flightEndDate: Date;

  @Column({nullable: true})
  season: string;

  @Column({nullable: true})
  topic: string;

  @Column({nullable: true})
  airport: string;

  @Column({default: 0, nullable: true})
  cash: number;

  @OneToMany(() => PlanPlace, planPlace => planPlace.plan)
  places: PlanPlace[];

  @Column({nullable: true})
  title: string;

  @Column({nullable: true, default: 5})
  rating: number;

  @Column({nullable: true, default: '리뷰를 작성해 보세요!'})
  selfReview: string;

  @Column({default: false})
  isPublic: boolean;

  @Column({default: false})
  isComplete: boolean;

  @Column({nullable: true})
  image: string;

  @OneToMany(() => Fork, fork => fork.plan)
  forks: Fork[];

  @OneToMany(() => Like, like => like.plan)
  likes: Like[];
}
