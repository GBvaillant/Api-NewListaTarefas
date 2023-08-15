import { Request, Response } from 'express'
import { prisma } from '../database'

export default {

    async createTask(req: Request, res: Response) {
        try {
            const { text, category, userId } = req.body

            if (text === null || undefined) {
                res.json({
                    err: true,
                    msg: 'tarefa inválida'
                })
            }
            const task = await prisma.task.create({
                data: {
                    text,
                    category,
                    userId
                }
            })
            return res.json({
                err: false,
                msg: 'Tarefa criada',
                task
            })

        } catch (err) {
            return res.json({ msg: err.message })
        }
    }

}