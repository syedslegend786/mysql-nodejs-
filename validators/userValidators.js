import { check } from "express-validator";

export const signupValidator = [
    check('user_login')
        .notEmpty()
        .withMessage('user_login is requried!'),
    check('user_pass')
        .notEmpty()
        .withMessage('user_pass is requried!'),
    check('user_nicename')
        .notEmpty()
        .withMessage('user_nicename is requried!'),
    check('user_email')
        .notEmpty()
        .withMessage('user_email is requried!'),
]
export const signInValidator = [
    check('user_email')
        .notEmpty()
        .withMessage('user_email is requried!'),
    check('user_pass')
        .notEmpty()
        .withMessage('user_pass is requried!')
]