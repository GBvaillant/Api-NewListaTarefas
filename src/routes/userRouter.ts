import userController from '../controllers/userController'

const userRouter = app => {
    app.post('/createUser', userController.createUser)
}

export default userRouter