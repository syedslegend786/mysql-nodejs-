import express from 'express'
import multer from 'multer'
import shortid from 'shortid'
import path from 'path'
import { db } from '../db.cofig.js'
//

const router = express.Router()
//
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { productController } from '../controllers/productContoller.js'
import { createProductValidator } from '../validators/productsValidators.js'
import { validateResult } from '../validators/validateResult.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

//routes......
router.post('/upload', upload.array('picture'), productController.createProduct)

export default router;
