import { Model} from "mongoose";



export type User= {
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
  ];
}

//for creating static
export interface UserModelOld extends Model<User>{
  isUserExists(userId: number): Promise<User| null>
}
