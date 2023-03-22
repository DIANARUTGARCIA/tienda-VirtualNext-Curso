import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    ok: boolean;
    message: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ ok: false, message: 'Debe especificar el query de búsqueda por fis' })
}