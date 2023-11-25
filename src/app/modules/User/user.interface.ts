import { Model} from "mongoose";



export type TUser= {
  "userId": "number",
  "username": "string",
  "password": "string",
  "fullName": {
      "firstName": "string",
      "lastName": "string"
  },
  "age": "number",
  "email": "string",
  "isActive": "boolean",
  "hobbies": [
    "string",
    "string"
],
  "address": {
      "street": "string",
      "city": "string",
      "country": "string"
  },
  "orders": [
    productName: "string",
    price: "number",
    quantity: "number"
  ],
  "isDeleted": "boolean";
}



//for creating static
export interface UserModel extends Model<TUser>{
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser| null>
}
