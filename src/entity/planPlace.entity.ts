import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

import {Place} from './place.entity';
import {Plan} from './plan.entity';

@Entity('tb_plan_places')
export class PlanPlace {
  @PrimaryGeneratedColumn()
  planPlaceId: number;

  @ManyToOne(() => Plan, plan => plan.planId)
  @JoinColumn({name: 'planId'})
  plan: Plan;

  @ManyToOne(() => Place, place => place.placeId)
  @JoinColumn({name: 'placeId'})
  place: Place;

  @Column({type: 'timestamp'})
  visitTime: Timestamp;
}
