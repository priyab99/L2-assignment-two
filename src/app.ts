
import express, { Application, Request, Response } from 'express'
import {UserRoutes} from './app/modules/User/user.route'
import cors from 'cors'
const app: Application = express();

//parsers
app.use(express.json())
app.use(cors())
app.use('/api',UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

export default app;
