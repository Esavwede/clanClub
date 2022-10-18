import express from 'express' 
import config from 'config' 
import logger from './utils/logger'
import createDatabaseConnection from './utils/database/connect'
import routes from './routes/index.route'



const app = express() 

const PORT = config.get<number>("PORT")


app.listen(PORT, async ()=>{
    logger.info(` Application listening on port ${ PORT }`)
    await createDatabaseConnection()  
    routes(app)
})