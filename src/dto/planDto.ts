import {type Fork} from 'src/entity/fork.entity';
import {type PlanPlace} from 'src/entity/planPlace.entity';
import {type Timestamp} from 'typeorm';

export interface PlanCreateDto {
  userId: number;
  startDate: Timestamp | number;
  endDate: Timestamp | number;
  country: string;
  city: string;
  flightStartDate: Timestamp | number;
  flightEndDate: Timestamp | number;
  airport: string;
  cash: number;
  places: PlanPlace[];
  title: string;
  rating: number;
  selfReview: string;
  forks: Fork[];
  isPublic: boolean;
  isComplete: boolean;
  image: string;
}

export interface PlanModifyDto {
  startDate?: Timestamp | number;
  endDate?: Timestamp | number;
  country?: string;
  city?: string;
  flightStartDate?: Timestamp | number;
  flightEndDate?: Timestamp | number;
  airport?: string;
  cash?: number;
  title?: string;
  rating?: number;
  selfReview?: string;
  image?: string;
}
