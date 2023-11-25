import express from 'express'
import { UserControllers } from './user.controller'

const router=express.Router()

//will call controller function
router.get('/users',UserControllers.getAllUsers);

router.post('/users',UserControllers.createUser);
router.get('/users/:userId',UserControllers.getSingleUser)



export const UserRoutes=router;