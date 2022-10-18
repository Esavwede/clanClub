import mongoose from "mongoose" 
import config from "config" 
import logger from "../logger"
const DB_URI = config.get<string>("DB_URI")



async function createDatabaseConnection():Promise<void> 
{
    return new Promise(async(resolve, reject)=>
    {
        try 
        {
    
           await (async ()=>{
               mongoose.connect(DB_URI);
            })() 
    
    
            const db = mongoose.connection 
    
            db.on('connected',()=>
            {
                console.log(' Database connection successfull ');
                return resolve() 
            })
    
        } 
        catch(e: any )
        {
            logger.error(` Error occured while creating database connection \n ${ e.message } \n ${ e.stack }`)
            return reject() 
        }
    })
}


export default createDatabaseConnection 