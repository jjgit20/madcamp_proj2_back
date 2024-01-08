import express, {type RequestHandler} from 'express';
import multer from 'multer';

import * as planController from '../controller/planController';
import {authenticate} from '../middleware/tokenAuth';

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

router.get('/', planController.getPlans as RequestHandler); // tested
router.post(
  '/',
  authenticate as RequestHandler,
  upload.single('image'),
  planController.createPlan as RequestHandler,
);
router.get(
  '/:planId',
  authenticate as RequestHandler,
  planController.getOnePlan as RequestHandler,
); // tested
router.patch(
  '/:planId',
  authenticate as RequestHandler,
  planController.modifyPlan as RequestHandler,
);
router.patch(
  '/:planId/isPublic',
  authenticate as RequestHandler,
  upload.single('image'),
  planController.modifyPlanPublic as RequestHandler,
);

module.exports = router;
