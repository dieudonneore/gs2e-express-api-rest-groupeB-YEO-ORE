const express = require('express')
const cors = require("cors");
const Config = require('../utils/config')
const bodyParser = require('body-parser')
const mongooseHelper = require('../core/databases/mongodb/mongodb')

const app = express()


class Server {
    constructor(){
        this.app=app
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(express.json())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    handleError400(){
        this.app.use((err, res, next) => {
            if(err && err.status===400 && 'body' in err)
                return res.status(400).json({error:true, message:"Mauvaise requete", data:null})
            next()
        })
        return this
    }

    handleError404(){
        this.app.use((err, res) => {
            return res.status(400).json({error:true, message:"Route introuvable ou inexistante", data:null})
        })
        return this
    }

    setRoutes(Router){
        new Router(this.app).getRoutes()
        return this
    }

    startServer(){
        this.app.listen(Config.apiPort, () => {
            console.log('server is running', Config.appName+" on api port: "+Config.apiPort)
            mongooseHelper.getInstance()
        })
        return this
    }
}

module.exports = Server