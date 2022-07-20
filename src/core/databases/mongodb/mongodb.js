const mongoose = require('mongoose')
const Config = require('../../../utils/config')


class MongooseHelper{

    constructor(url, port, dbname){
        this.url=url
        this.port=port
        this.dbname=dbname
    }

    async getInstance(){
        if(this.instance){
            return instance
        }
        else{
            await this.connect()
        }
    }
    async connect(){
        try{
            let instance  = await mongoose.connect(`${this.url}:${this.port}/${this.dbname}`)
            console.log("instance créé")
            return instance

        }catch(err){
            console.log(err.message)
        }
    }


}
const mongooseHelper = new MongooseHelper(Config.dburl, Config.dbport, Config.dbname)

module.exports = mongooseHelper