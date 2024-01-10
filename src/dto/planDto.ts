import {type PlanPlace} from 'src/entity/planPlace.entity';

export interface PlanCreateDto {
  userId: number;
  startDate: string | Date;
  endDate: string | Date;
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
  image?: string;
  isComplete?: boolean;
  isPublic?: boolean;
}

export interface PlanModifyDto {
  startDate?: string | Date;
  endDate?: string | Date;
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
  places: string;
}

export interface PlanModifyQueryDto {
  startDate?: string | Date;
  endDate?: string | Date;
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
