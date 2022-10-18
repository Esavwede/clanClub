
import pino from "pino";
import day from "dayjs" 



const logger = pino
(
    {
        "name":"GeneralLogger",
        "level":"info",
        "base":
        {
            "pid": false,
            "hostname": false 
        },
        timestamp()
        {
            return ` time:${ day().format() }`
        }
    }
) 



export default logger 