// product_name,
//     product_description,
//     variation


import { check } from "express-validator";

export const createProductValidator = [
    check('product_name')
        .notEmpty()
        .withMessage('product_name is requried!'),
    check('product_description')
        .notEmpty()
        .withMessage('product_description is requried!'),
    check('variation')
        .notEmpty()
        .withMessage('variation is requried!')
]