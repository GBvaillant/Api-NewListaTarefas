import taskController from '../controllers/taskController'

const taskRouter = app => {
    app.post('/createTask', taskController.createTask)
}

export default taskRouter