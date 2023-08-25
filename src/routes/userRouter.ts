import userController from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware'

const userRouter = app => {
    app.post('/createUser', userController.createUser)
    app.get('/listUsers', userController.listUsers)
    app.post('/login', userController.login)

    app.use(authMiddleware)

    app.get('/profile', userController.getProfile)
}

export default userRouter