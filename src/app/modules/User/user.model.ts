import { Schema, model } from 'mongoose';
import { User} from './user.interface';


const userSchema=new Schema<User>({

    userId:{type: Number, required: true},

    username: {type: String},
    password: {type: String},

    fullName: {
        firstName: {
        type: String,
        required: true
    },

        lastName: {
            type: String,
            required: true,
        }
    },
    age: {type: Number},
    email: {type: String, required: true},
    isActive: {type: Boolean},
    hobbies: {type: [String]},
    address:{
        street: {type: String},
        city: {type: String},
        country: {type: String}
    },
    orders: [
        {
            productName: {type : String},
            price: {type: Number},
            quantity: {type: Number}
        }
    ]
})

export const UserModel=model<User>('UserModel',userSchema);