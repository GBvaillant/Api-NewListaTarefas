import userController from '../controllers/userController'

const userRouter = app => {
    app.post('/createUser', userController.createUser)
    app.get('/listUsers', userController.listUsers)
    app.post('/login', userController.login)
}

export default userRouter