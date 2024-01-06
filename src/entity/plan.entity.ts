import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
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
  userId: number;

  @Column({type: 'timestamp'})
  startDate: Timestamp;

  @Column({type: 'timestamp'})
  endDate: Timestamp;

  @Column({nullable: true})
  country: string;

  @Column({nullable: true})
  city: string;

  @Column({type: 'timestamp', nullable: true})
  flightStartDate: Timestamp;

  @Column({type: 'timestamp', nullable: true})
  flightEndDate: Timestamp;

  @Column({nullable: true})
  airport: string;

  @Column({default: 0, nullable: true})
  cash: number;

  @OneToMany(() => PlanPlace, planPlace => planPlace.planPlaceId)
  places: PlanPlace[];

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  rating: number;

  @Column({nullable: true})
  selfReview: string;

  @Column({default: false})
  isPublic: boolean;

  @Column({nullable: true})
  image: string;

  @OneToMany(() => Fork, fork => fork.giver)
  forks: Fork[];

  @OneToMany(() => Like, like => like.giver)
  likes: Like[];
}
