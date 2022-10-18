import { Express } from "express"
import logger from "../utils/logger"
import userRoutes from "./user/user.route"


export default function routes(app: Express)
{
    try 
    {
        userRoutes(app)
        logger.info(` CreatedApi Routes `)
    }
    catch(e: any)
    {
        logger.error(` Error occured while creating api routes `)
    }
} 