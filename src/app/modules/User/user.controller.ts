/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema, { updateUserSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    // Creating a schema validation using zod
    const zodparsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodparsedData);
    
   
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: null
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      data: null,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const result = await UserServices.getSingleUserFromDB(userId);
    
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: err.success || false,
      message: err.message || "Something went wrong",
      data: err.error || null,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const result = await UserServices.deleteSingleUserFromDB(userId); 
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: err.success || false,
      message: err.message || "Something went wrong",
      data: err.error || null,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const updatedUserData = req.body;
    // console.log(updatedUserData); 
    const zodparsedData = updateUserSchema.parse(updatedUserData)
    if (typeof userId !== 'number') {
      throw new Error('Invalid userId');
    }
    const result = await UserServices.updateSingleUserFromDB(userId, zodparsedData);
    //const { password, ...userWithOutPassword } = result;
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: err.success || false,
      message: err.message || "Something went wrong",
      data: err.error || null,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser
};