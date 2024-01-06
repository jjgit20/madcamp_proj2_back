import express, {type RequestHandler} from 'express';

import * as kakaoAuthController from '../controller/kakaoAuthController';

const router = express.Router();

router.post('/login', kakaoAuthController.login as RequestHandler); // tested
router.post('/signup', kakaoAuthController.signup as RequestHandler); // tested

module.exports = router;
