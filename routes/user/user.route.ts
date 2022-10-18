import logger from "../../utils/logger";
import express, { Request, Response, Express, NextFunction } from "express" 

const router = express.Router() 


export default function userRoutes(app: Express )
{
    try 
    {

        router.post('/signup',(req: Request, res: Response, next: NextFunction)=>{  return res.send('Ok')}) 
        router.post('/signin',(req: Request, res: Response, next: NextFunction)=>{  return res.send('Ok')}) 


        app.use('/api/v1/user', router ) 
        logger.info('User routes created ')
    }
    catch(e: any)
    {
        logger.error(` Error occured while creating user routes \n ${ e.message } \n ${ e.stack }`)
    }
}