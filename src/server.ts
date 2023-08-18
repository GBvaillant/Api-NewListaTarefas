import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import taskRouter from './routes/taskRouter'
import userRouter from './routes/userRouter'

const app = express()
const PORT = 5050

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

taskRouter(app)
userRouter(app)

app.get('/', (req, res) => {
    res.send({ msg: 'heloo !!' })
})

app.listen(PORT, () => {
    console.log('Server runing 🚀')
})
 