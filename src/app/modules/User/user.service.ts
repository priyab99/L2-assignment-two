import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDB=async (user: TUser)=>{

    if(await User.isUserExists(user.userId)){
        throw new Error('User already exists!');
    
       }
   
   const result= await User.create(user);
   return result;

}

const getAllUsersFromDB= async()=>{
    const result= await User.find({}, { username: true, fullName: true, age: true, email: true, address: true });
    return result;
}

const getSingleUserFromDB= async(userId: number)=>{
    const result= await User.findOne({userId});
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

const deleteSingleUserFromDB= async(userId: number)=>{
    const result= await User.deleteOne({userId});
    if(!result || result.deletedCount===0){
        throw{
            success: false,
            message: "User not found",
            error:{
                code: 404,
                description: "User not found!"
            }
        };
    }
    return null;
}


export const UserServices={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteSingleUserFromDB
}