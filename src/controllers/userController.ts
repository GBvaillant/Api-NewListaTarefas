import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../database'

export default {

    async createUser(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body
            const hash = await bcrypt.hash(password, 10)
            const userExist = await prisma.user.findUnique({
                where: {
                    username,
                    email
                }
            })

            if (userExist) {
                res.json({
                    err: true,
                    msg: 'erro: Usuário já existe !!'
                })
            }

            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hash
                },
                select: {
                    username: true,
                    email: true,
                    password: false

                }
            })
            return res.json({
                err: false,
                msg: 'User criado com sucesso !!',
                user
            })

        } catch (err) {
            return res.json({ msg: err.message })
        }
    }
}