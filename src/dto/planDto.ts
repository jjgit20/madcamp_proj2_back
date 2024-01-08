import {type PlanPlace} from 'src/entity/planPlace.entity';

export interface PlanCreateDto {
  userId: number;
  startDate: Date | number;
  endDate: Date | number;
  country: string;
  city: string;
  // flightStartDate: Date | number;
  // flightEndDate: Date | number;
  season: string;
  topic: string;
  airport: string;
  cash: number;
  places: PlanPlace[];
  title: string;
  rating: number;
  selfReview: string;
  image: string;
}

export interface PlanModifyDto {
  startDate?: Date | number;
  endDate?: Date | number;
  country?: string;
  city?: string;
  flightStartDate?: Date | number;
  flightEndDate?: Date | number;
  airport?: string;
  cash?: number;
  title?: string;
  rating?: number;
  selfReview?: string;
  image?: string;
}
