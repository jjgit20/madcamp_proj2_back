import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

import {PlanPlace} from './planPlace.entity';

@Entity('tb_places')
export class Place {
  @PrimaryGeneratedColumn()
  placeId: number;

  @Column({type: 'double'})
  latitude: number;

  @Column({type: 'double'})
  longitude: number;

  @Column()
  placeType: string;

  @Column()
  name: string;

  @OneToMany(() => PlanPlace, planPlace => planPlace.place)
  plans: PlanPlace[];
}
