import express, {
  type RequestHandler,
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import * as userController from '../controller/userController';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});
router.get('/:userId', userController.getUser as RequestHandler); // tested, needs jwt
router.get('/:userId/plans', userController.getUserPlans as RequestHandler); // tested, needs jwt

module.exports = router;
