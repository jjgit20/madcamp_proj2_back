import {type Request, type Response} from 'express';

import * as userService from '../service/userService';

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const userResponse = await userService.getUser(userId);
    res.json(userResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: getUser');
  }
};

export const getUserPlans = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 50;
    const planResponse = await userService.getUserPlans(userId, page, limit);
    res.json(planResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: getting user plans');
  }
};
