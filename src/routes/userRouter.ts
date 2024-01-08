import express, {
  type RequestHandler,
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import * as userController from '../controller/userController';
import {authenticate} from '../middleware/tokenAuth';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});
router.get(
  '/:userId',
  authenticate as RequestHandler,
  userController.getUser as RequestHandler,
); // tested, needs jwt
router.get(
  '/:userId/plans',
  authenticate as RequestHandler,
  userController.getUserPlans as RequestHandler,
); // tested, needs jwt

module.exports = router;
