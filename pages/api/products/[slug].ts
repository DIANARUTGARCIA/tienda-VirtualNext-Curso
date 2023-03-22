
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data =
    | { message: string }
    | IProduct

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getProduct(req, res);
        default:
            return res.status(400).json({ message: 'El metodo no existe,baboso' })
    }
}

//Función para traer un producto
const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const { slug } = req.query;

    const productToGet = await Product.findOne({ slug }).lean();
    //Validación para verificar si existe una producto con ese slug
    if (!productToGet) {
        await db.disconnect();
        return res.status(404).json({ message: 'No hay un producto con ese slug:' + slug })
    }
    productToGet.images = productToGet.images.map(image => {
        return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
    });

    return res.status(200).json(productToGet)
}
