import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser= async (req: Request, res: Response)=>{

   try{
    const {user: userData}=req.body;


    const result=await UserServices.createUserIntoDB(userData);
        
    
        res.status(200).json({
            sucess: true,
            message: "User created successfully!",
            data: result,
        });
   }catch(err){
    console.log(err)
   }
};

export const UserControllers={
    createUser,
}