import mongoose from "mongoose";
import hashPassword from "../../config/hashPassword.js";
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    refreshTokens:{
        type:[String],
        default:[],
        validate:{
            validator:(value)=>{
                if(value.length > 5)
                    return false
                return true
            },
            message:"Refresh token limit exceeded"
        },
        select:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    passwordChangedAt:{
        type:Date,
        select:false
    },
    OTP:{
        type:String,
        select:false
    },
    expiryOtp:{
        type:Date,
        select:false
    },
    lastOtpSentAt:{
        type:Date,
        select:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:true,
        enum:["user" , "admin" , "vendor"],
        default:"user"
    },
    image:{
        url:String,
        public_id:String
    },
    // vendorInfo:{
    //     type:{
    //         storeName:{
    //             type:String,
    //             required:function(){
    //                 return this.role === "vendor"
    //             }
    //         },
    //         isApproved:{
    //             type:Boolean,
    //             default:false,
    //             required:function(){
    //                 return this.role === "vendor"
    //             }
    //         },

    //     },
    //     select:false
    // }
},{
    timestamps:true,
    versionKey:false,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}

})
hashPassword(UserSchema)

UserSchema.methods.passwordChangedAfter = function(JWTtimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTtimestamp < changedTimestamp
    }
    return false
}

UserSchema.virtual("vendorInfo",{
    ref:"Vendor",
    localField:"_id",
    foreignField:"owner",
    justOne:true
})
const userModel = mongoose.model("User",UserSchema,"users");
export default userModel;
