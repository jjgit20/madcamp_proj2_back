import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

import {PlanPlace} from './planPlace.entity';

@Entity('tb_places')
export class Place {
  @PrimaryGeneratedColumn()
  placeId: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => PlanPlace, planPlace => planPlace.place)
  plans: PlanPlace[];
}
