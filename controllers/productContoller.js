import { db } from "../db.cofig.js";

export const productController = {
    createProduct: async (req, res) => {
        try {
            let {
                product_name,
                product_description,
                variation
            } = req.body;
            //parsing the variation...
            variation = JSON.parse(variation)
            //validation for form data
            if (!product_name) return res.status(400).json({ msg: "product name is required!" })
            if (!product_description) return res.status(400).json({ msg: "product description is required!" })
            if (!variation) return res.status(400).json({ msg: "product variation is required!" })
            if (req.files.length === 0) return res.status(400).json({ msg: "product images are required!" })
            //validation for form data


            const PRODUCT_INSERT_QUERY = `
            insert into products(
                product_name,
                product_description,
                variation
                )
                values(
                ?,
                ?,
                ?
                )
            `
            const IMAGE_INSERT_QUERY = `
                insert into images(
                image,
                product_id
                )
                values(
                ?,
                ?
                )  
            `
            const INSER_INTO_VARIATION = `
            insert into variations(
                title,
                quantity,
                status,
                alert_at,
                dosage,
                price,
                packaging,
                product_id
                )
                values(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
                )
            `
            const [rows, fields] = await db.execute(PRODUCT_INSERT_QUERY, [product_name, product_description, 1])
            const inserted_prodcut_id = rows.insertId

            for (let x = 0; x < req.files.length; x++) {
                const [_rows, _fields] = await db.execute(IMAGE_INSERT_QUERY, [req.files[x].filename, inserted_prodcut_id])
            }
            for (let x = 0; x < variation.length; x++) {
                const [vR, vF] = await db.execute(INSER_INTO_VARIATION, [
                    variation[x].title,
                    variation[x].quantity,
                    variation[x].status,
                    variation[x].alert_at,
                    variation[x].dosage,
                    variation[x].price,
                    variation[x].packaging,
                    inserted_prodcut_id
                ])
            }
            return res.status(200).json({ msg: 'created successfully' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: error.message })
        }
    }
}