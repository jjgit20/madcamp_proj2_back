import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

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

  @Column()
  country: string;

  @Column()
  city: string;

  @Column({type: 'timestamp'})
  flightStartDate: Timestamp;

  @Column({type: 'timestamp'})
  flightEndDate: Timestamp;

  @Column()
  airport: string;

  @Column()
  cash: number;

  @OneToMany(() => PlanPlace, planPlace => planPlace.planPlaceId)
  places: PlanPlace[];
}
