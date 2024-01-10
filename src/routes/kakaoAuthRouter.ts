import express, {type RequestHandler} from 'express';

import * as kakaoAuthController from '../controller/kakaoAuthController';
import {authenticate} from '../middleware/tokenAuth';

const router = express.Router();

router.post('/login', kakaoAuthController.login as RequestHandler); // tested
router.post('/signup', kakaoAuthController.signup as RequestHandler); // tested
router.get(
  '/refresh',
  authenticate as RequestHandler,
  kakaoAuthController.refreshToken as RequestHandler,
); // tested

module.exports = router;
