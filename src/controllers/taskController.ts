import { Request, Response } from 'express'
import { prisma } from '../database'

export default {

    async createTask(req: Request, res: Response) {
        try {
            const { text, category, complete, userId } = req.body

            if (!text) {
                res.json({
                    err: true,
                    msg: 'tarefa inválida'
                })
            }
            const task = await prisma.task.create({
                data: {
                    text,
                    category,
                    complete,
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
    },

    async listTask(req: Request, res: Response) {
        try {
            const tasks = await prisma.task.findMany({
                select: {
                    id: true,
                    text: true,
                    category: true,
                    complete: true,
                    userId: true
                }
            })
            if (tasks === null || tasks === undefined) {
                res.json({
                    err: true,
                    msg: 'Não existe tasks !'
                })
            }
            return res.json({
                err: false,
                tasks
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },

    async deleteTask(req: Request, res: Response) {
        try {
            const { id } = req.params
            const task = await prisma.task.delete({
                where: { id: Number(id) }
            })
            return res.json({
                err: false,
                msg: 'Task apagada com sucesso !',
                task
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },

    async updateTask(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { complete } = req.body
            const task = await prisma.task.update({
                where: {
                    id: Number(id)
                },
                data: {
                    complete
                }
            })

            return res.json({
                err: false,
                msg: 'task modificada',
                task
            })
        } catch (err) {
            return res.json({ msg: err.message })
        }
    }
}