/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";

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
  } catch (error:any) {

    res.status(500).json({
      success: false,
      message: error.message ||'Something went wrong',
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
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
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

const deleteSingleUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const result = await UserServices.deleteSingleUserFromDB(userId); // Add parentheses here
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
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


export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser
};
