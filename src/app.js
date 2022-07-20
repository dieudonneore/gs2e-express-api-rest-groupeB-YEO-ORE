const Server = require('./core/server')
const UserRoutes =require('./modules/users/routes/user.route')
/* const Config = require('./utils/config') */

const server = new Server()

server.handleError400()
      .setRoutes(UserRoutes)
      .handleError404()
      .startServer()

