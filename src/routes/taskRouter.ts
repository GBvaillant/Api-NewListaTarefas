import taskController from '../controllers/taskController'

const taskRouter = app => {
    app.post('/createTask', taskController.createTask)
    app.get('/listTasks', taskController.listTask)
    app.delete('/deleteTask/:id', taskController.deleteTask)
    app.put('/updateTask/:id', taskController.updateTask)
}

export default taskRouter