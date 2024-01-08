import express, {type RequestHandler} from 'express';

import * as userController from '../controller/userController';
import {authenticate} from '../middleware/tokenAuth';

const router = express.Router();

router.get(
  '/:userId',
  authenticate as RequestHandler,
  userController.getUser as RequestHandler,
);
router.get(
  '/:userId/plans',
  authenticate as RequestHandler,
  userController.getUserPlans as RequestHandler,
);

module.exports = router;
