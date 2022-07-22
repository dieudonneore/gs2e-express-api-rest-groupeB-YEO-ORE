const Server = require('./core/server')
const TaskRoutes = require('./modules/tasks/routes/task.route')
const UserRoutes =require('./modules/users/routes/user.route')
/* const Config = require('./utils/config') */

const server = new Server()

server.handleError400()
      .setRoutes(UserRoutes)
      .setRoutes(TaskRoutes)
      .handleError404()
      .startServer()

