import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Place} from './place.entity';
import {Plan} from './plan.entity';

@Entity('tb_plan_places')
export class PlanPlace {
  @PrimaryGeneratedColumn()
  planPlaceId: number;

  @ManyToOne(() => Plan, plan => plan.places)
  plan: Plan;

  @ManyToOne(() => Place, place => place.plans)
  place: Place;

  @Column({type: 'timestamp'})
  visitDate: Date;

  @Column()
  orderInDay: number;

  @Column()
  money: number;
}
