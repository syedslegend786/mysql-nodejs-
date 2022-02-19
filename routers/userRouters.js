import express from 'express'
import { userController } from '../controllers/userController.js';
import { signInValidator, signupValidator } from '../validators/userValidators.js';
import { validateResult } from '../validators/validateResult.js';
const router = express.Router()

router.post('/signup', signupValidator, validateResult, userController.signUp)
router.post('/signin', signInValidator, validateResult, userController.signIn)

export default router;