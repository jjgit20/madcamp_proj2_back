import {type Request, type Response} from 'express';
import {type PlanModifyDto, type PlanCreateDto} from 'src/dto/planDto';

import * as planService from '../service/planService';

export const getPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 50;
    const planResponse = await planService.getPlans(page, limit);
    res.json(planResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: getting all plans');
  }
};

export const getOnePlan = async (req: Request, res: Response) => {
  try {
    const planId = parseInt(req.params.planId);
    const planResponse = await planService.getOnePlan(planId);
    res.json(planResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: getting one plan');
  }
};

export const createPlan = async (req: Request, res: Response) => {
  try {
    const plan: PlanCreateDto = req.body;
    const planResponse = await planService.createPlan(plan);
    res.json(planResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: creating one plan');
  }
};

export const modifyPlanPublic = async (req: Request, res: Response) => {
  try {
    const planId = parseInt(req.params.planId);
    await planService.modifyPlanPublic(planId);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: modifyPlanPublic');
  }
};

export const modifyPlan = async (req: Request, res: Response) => {
  try {
    const planId = parseInt(req.params.planId);
    const planModify: PlanModifyDto = req.body;
    await planService.modifyPlan(planId, planModify);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: modifyPlan');
  }
};
