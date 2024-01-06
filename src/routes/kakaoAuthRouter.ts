import express, {type RequestHandler} from 'express';
import * as kakaoAuthController from '@src/controller/kakaoAuthController';

const router = express.Router();

router.post('/login', kakaoAuthController.login as RequestHandler);

router.post('/signup', kakaoAuthController.signup as RequestHandler);

module.exports = router;
