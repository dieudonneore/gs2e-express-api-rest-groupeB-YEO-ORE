class Utils {
    static async apiResponse(res, promise){
        const response = await promise
        
        return response
        /* try{
            const response = await promise
            const {error,message, data} = response
            return res.status(response.status).json({error, message, data})
        }catch(err){
            return res.status(500)
                      .json({
                        error:true, 
                        message: "une erreur interne s'est produite", 
                        data:null})
        } */
    }
}

module.exports = Utils