import { Request, Response, NextFunction } from 'express'
import { prisma } from '../database'
import jwt from 'jsonwebtoken'

type JwtPayload = {
    id: number
}
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    if (!authorization) {
        res.json({
            err: true,
            msg: 'Não autorizado',
        })
    }
    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_HASH) as JwtPayload

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            password: false,
            Task: true
        }
    })

    if (!user) {
        res.json({
            err: true,
            msg: 'Não autorizado',
        })
    }

    req.user = user

    next()
}
