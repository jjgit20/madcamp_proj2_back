import {type Response, type Request} from 'express';

export const getPlace = async (req: Request, res: Response) => {
  try {
    const latitude = parseInt(req.body.latitude as string) || 0;
    const longitude = parseInt(req.body.longitude as string) || 0;
    const type = req.body.type as string;
    // const placeResponse = placeService.getPlace(latitude, longitude, type);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: getPlace');
  }
};
