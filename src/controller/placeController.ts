import {type Response, type Request} from 'express';

import * as placeService from '../service/placeService';

export const getPlace = async (req: Request, res: Response) => {
  try {
    const latitude = (req.body.latitude as number) || 0;
    const longitude = (req.body.longitude as number) || 0;
    const type = req.body.type as string;
    const name = req.body.name as string;
    const placeResponse = await placeService.getPlace(
      latitude,
      longitude,
      type,
      name,
    );
    res.json(placeResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: getPlace');
  }
};

export const addPlanPlace = async (req: Request, res: Response) => {
  try {
    const planId = parseInt(req.params.planId);
    const placeId = parseInt(req.params.placeId);
    const orderInDay = req.body.orderInDay as number;
    const visitDate = req.body.visitDate as Date;
    const planPlaceResponse = await placeService.addPlanPlace(
      planId,
      placeId,
      orderInDay,
      visitDate,
    );
    res.json(planPlaceResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: addPlanPlace');
  }
};

export const deletePlanPlace = async (req: Request, res: Response) => {
  try {
    const planPlaceId = parseInt(req.params.planPlaceId);
    const planPlaceResponse = await placeService.deletePlanPlace(planPlaceId);
    res.json(planPlaceResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: deletePlanPlace');
  }
};
