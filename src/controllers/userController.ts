import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../database'

export default {

    async createUser(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body
            const confirmPass = req.body.confirmPass
            const hash = await bcrypt.hash(password, 10)
            const userExist = await prisma.user.findUnique({
                where: {
                    email,
                    username
                }
            })

            if (userExist) {
                res.json({
                    err: true,
                    msg: 'erro: Usuário já existe !!'
                })
            }

            if (confirmPass !== password) {
                res.json({
                    err: true,
                    msg: 'Senhas não conferem'
                })
            }

            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hash
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    password: false

                }
            })

            console.log('Novo user criado !!')

            return res.json({
                err: false,
                msg: 'User criado com sucesso !!',
                user
            })


        } catch (err) {
            return res.json({ msg: err.message })
        }
    },

    async listUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    email: true,
                    password: false
                }
            })

            if (!users) {
                res.json({
                    err: true,
                    msg: 'Não existe usuários'
                })
            }

            return res.json({
                err: false,
                users
            })


        } catch (err) {
            return res.json({ msg: err.message })
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body

            const user = await prisma.user.findUnique({
                where: {
                    username
                }
            })
            

            if (!user) {
                res.json({
                    err: true,
                    msg: 'Usuário ou senha inválidos'
                })
            }
            const verifyPass = await bcrypt.compare(password, user.password)

            if (!verifyPass) {
                res.json({
                    err: true,
                    msg: 'Usuário ou senha inválidos'
                })
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_HASH, {
                expiresIn: '8h'
            })
            return res.json({
                err: false,
                msg: 'Token gerado',
                user,
                token
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }

    }
}