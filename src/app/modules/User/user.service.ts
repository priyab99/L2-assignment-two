import { User } from "./user.interface";
import { UserModel } from "./user.model";


const createUserIntoDB=async (user: User)=>{

    if(await UserModel.isUserExists(user.userId)){
        throw new Error('User already exists!');
    
       }
   
   const result= await UserModel.create(user);
   
   
   

   return result;

}

const getAllUsersFromDB= async()=>{
    const result= await UserModel.find({}, { username: true, fullName: true, age: true, email: true, address: true });
    return result;
}

const getSingleUserFromDB= async(userId: number)=>{
    const result= await UserModel.findOne({userId});
    if(!result){
        throw{
            success: false,
            message: "User not found",
            error:{
                code: 404,
                description: "User not found!"
            }
        }
    }
    return result;
}


export const UserServices={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
}