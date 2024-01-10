import express, {type RequestHandler} from 'express';
import multer from 'multer';

import * as planController from '../controller/planController';
import {authenticate} from '../middleware/tokenAuth';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB (adjust as needed)
  },
});

const router = express.Router();

router.get(
  '/',
  authenticate as RequestHandler,
  planController.getPlans as RequestHandler,
);
router.get(
  '/:planId',
  authenticate as RequestHandler,
  planController.getOnePlan as RequestHandler,
);

router.post(
  '/',
  authenticate as RequestHandler,
  upload.single('file'),
  planController.createPlan as RequestHandler,
);
router.patch(
  '/:planId',
  authenticate as RequestHandler,
  upload.single('file'),
  planController.modifyPlan as RequestHandler,
);
router.delete(
  '/:planId',
  authenticate as RequestHandler,
  planController.deletePlan as RequestHandler,
);

router.patch(
  '/:planId/isPublic',
  authenticate as RequestHandler,
  planController.modifyPlanPublic as RequestHandler,
);
router.patch(
  '/:planId/isComplete',
  authenticate as RequestHandler,
  planController.modifyPlanComplete as RequestHandler,
);

router.post(
  '/:planId/fork',
  authenticate as RequestHandler,
  planController.forkPlan as RequestHandler,
);
router.patch(
  '/:planId/like',
  authenticate as RequestHandler,
  planController.likePlan as RequestHandler,
);

module.exports = router;
