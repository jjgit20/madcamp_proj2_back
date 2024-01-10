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
    res.status(500).send('Internal Server Error: getPlans');
  }
};

export const getOnePlan = async (req: Request, res: Response) => {
  try {
    const tokenUserId = (req as any).user?.userId as number;
    const planId = parseInt(req.params.planId);
    const planResponse = await planService.getOnePlan(tokenUserId, planId);
    res.json(planResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: getOnePlan');
  }
};

export const createPlan = async (req: Request, res: Response) => {
  try {
    const tokenUserId = (req as any).user?.userId as number;
    const plan: PlanCreateDto = req.body;
    const file = req.file;
    const planResponse = await planService.createPlan(tokenUserId, plan, file);
    res.json(planResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: createPlan');
  }
};

export const modifyPlan = async (req: Request, res: Response) => {
  try {
    const tokenUserId = (req as any).user?.userId as number;
    const planId = parseInt(req.params.planId);
    const planModify: PlanModifyDto = req.body;
    const file = req.file;
    const planModifyResponse = await planService.modifyPlan(
      tokenUserId,
      planId,
      planModify,
      file,
    );
    res.json(planModifyResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: modifyPlan');
  }
};

export const deletePlan = async (req: Request, res: Response) => {
  try {
    const tokenUserId = (req as any).user?.userId as number;
    const planId = parseInt(req.params.planId);
    const planDeleteResponse = await planService.deletePlan(
      tokenUserId,
      planId,
    );
    res.json(planDeleteResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: deletePlan');
  }
};

export const modifyPlanPublic = async (req: Request, res: Response) => {
  try {
    const tokenUserId = (req as any).user?.userId as number;
    const planId = parseInt(req.params.planId);
    const planModifyResponse = await planService.modifyPlanPublic(
      tokenUserId,
      planId,
    );
    res.json(planModifyResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: modifyPlanPublic');
  }
};

export const modifyPlanComplete = async (req: Request, res: Response) => {
  try {
    const tokenUserId = (req as any).user?.userId as number;
    const planId = parseInt(req.params.planId);
    const planModifyResponse = await planService.modifyPlanComplete(
      tokenUserId,
      planId,
    );
    res.json(planModifyResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: modifyPlanComplete');
  }
};

export const forkPlan = async (req: Request, res: Response) => {
  try {
    const tokenUserId = (req as any).user?.userId as number;
    const planId = parseInt(req.params.planId);
    const planForkResponse = await planService.forkPlan(tokenUserId, planId);
    res.json(planForkResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: modifyPlanComplete');
  }
};

export const likePlan = async (req: Request, res: Response) => {
  try {
    const tokenUserId = (req as any).user?.userId as number;
    const planId = parseInt(req.params.planId);
    const planLikeResponse = await planService.likePlan(tokenUserId, planId);
    res.json(planLikeResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: modifyPlanComplete');
  }
};
