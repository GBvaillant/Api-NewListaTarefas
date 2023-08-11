import express from 'express'

const app = express()
const PORT = 5050

app.use(express.json())
app.listen(PORT, () => {
    console.log('Server runing 🚀')
})

