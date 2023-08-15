import express from 'express'
import taskRouter from './routes/taskRouter'
import userRouter from './routes/userRouter'

const app = express()
const PORT = 5050
app.use(express.json())

taskRouter(app)
userRouter(app)


app.listen(PORT, () => {
    console.log('Server runing 🚀')
})
