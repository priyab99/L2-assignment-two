import { Schema, model } from 'mongoose';
import { TUser, UserModel} from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../config';


const userSchema=new Schema<TUser, UserModel>({

    userId:{type: Number, required: true,  unique: true},

    username: {type: String,  unique: true,},
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

//pre save middleware
userSchema.pre('save',async function(next){
    //console.log(this, 'pre hook: we will save data');
    //hashing password
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user=this;
        //const hashedPassword= bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
        //user.password=hashedPassword;
        user.password=await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
        next();
    
})
    
//})

//post save middleware

userSchema.post('save',function(doc,next){
   // console.log(this, 'post hook: we saved data');
   //const user=this;
   //bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
   doc.password='';
   next();
})

userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  
  userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  
  userSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });

//creating a custom static method
userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId });
    return existingUser;
  };

export const User=model<TUser>('UserModel',userSchema);