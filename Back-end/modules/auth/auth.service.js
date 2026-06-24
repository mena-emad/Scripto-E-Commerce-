import userModel from "../../data/models/User.js";
import AppError from "../../utils/AppError.js";
import {v2 as cloudinary} from "cloudinary";
import sendEmail from "../../utils/SendEmail.js";
import {createAT, createRT} from "../../utils/createTokens.js";
import vendorModel from "../../data/models/Vendor.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
//======== generate OTP ========
export const generateOTPService = async(email,type)=>{
    const user = await userModel.findOne({email}).select("+OTP +expiryOtp +lastOtpSentAt");
    if(!user){
        throw new AppError("User does not exist",400);
    }
    const minuteLimit = 2*60*1000;
    if(user.lastOtpSentAt&&(Date.now()-user.lastOtpSentAt)<minuteLimit){
        const timeLeft = Math.ceil((minuteLimit-(Date.now()-user.lastOtpSentAt))/1000);
        throw new AppError(`OTP limit exceeded Wait ${timeLeft} seconds`,400);
    }

    const otp = crypto.randomInt(100000,999999).toString();
    const hashOtp = crypto.createHash("sha256").update(otp).digest("hex");
    user.OTP = hashOtp;
    user.expiryOtp = Date.now() + 15*60*1000;
    user.lastOtpSentAt = Date.now();
    await user.save();
    sendEmail({email:user.email,OTP:otp,name:user.name,type});
    return otp
}
// ======== verifying via email ========
export const verifyEmailService = async(email,plainOtp)=>{
    const user = await userModel.findOne({email}).select("+OTP +expiryOtp +lastOtpSentAt +refreshTokens");
    if(!user){
        throw new AppError("User does not exist",400);
    }
    const hashOtp = crypto.createHash("sha256").update(plainOtp).digest("hex");
    if(user.OTP !== hashOtp){
        throw new AppError("Invalid OTP Please try again",400);
    }
    if(user.expiryOtp < Date.now()){
        throw new AppError("OTP expired Please try again",400);
    }
    user.isVerified = true;
    user.OTP = undefined;
    user.expiryOtp = undefined;
    user.lastOtpSentAt = undefined;
    const refreshToken = createRT(user);
    const accessToken = createAT(user);
    user.refreshTokens.push(refreshToken);
    await user.save();
    user.password = undefined;
    user.refreshTokens = undefined;
    return {user,refreshToken,accessToken};
}
//======== user registeration service ========
export const registerService = async (user,fileData)=>{
    let message = "User registered successfully please verify your email to use the app";
    const currentUser = await userModel.findOne({email:user.email});
    if(currentUser){
        throw new AppError("User already exists",400);
    }
    if(user.role === "admin")
        throw new AppError("You cannot register as admin",400);
    if(fileData)
        user.image = {
            url:fileData.path,
            public_id:fileData.filename
        };
    const newUser = (await userModel.create(user));
    if(newUser.role === "vendor"){
        message += " Vendor registration pending please wait for approval from admin";
        const vendor = await vendorModel.create({
            storeAdress:user.storeAdress,
            storePhone:user.storePhone,
            storeName:newUser.name,
            storeDescription:user.storeDescription,
            storeLogo:newUser.image?.url||"",
            owner:newUser._id
        })
    }
    const OTP = await generateOTPService(newUser.email,"verify");
    newUser.password = undefined;
    newUser.OTP = undefined;
    newUser.expiryOtp = undefined;
    newUser.lastOtpSentAt = undefined;
    return {newUser,message};
    
}

//======== login service ========
export const loginService = async(email,password)=>{
    const user = await userModel.findOne({email}).select("+password +refreshTokens");
    if(!user)
        throw new AppError("User does not exist Please register first",400);
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect)
        throw new AppError("Incorrect password Please try again",400);
    if(!user.isVerified){
        await generateOTPService(user.email,"verify")
        throw new AppError("Please verify your email to login check your inbox",400);

    }
    if(user.isBlocked)
        throw new AppError("Your account is blocked please contact admin",400);
    const refreshToken = createRT(user);
    const accessToken = createAT(user);
    if(user.refreshTokens.length>=5)
        user.refreshTokens.shift();
    
    user.refreshTokens.push(refreshToken);
    await user.save();
    user.password = undefined;
    user.refreshTokens = undefined;
    return {user,refreshToken,accessToken};
}
// ======== generate new access token ========
export const generateNewAccessTokenService = async(currentRefreshToken)=>{
    let decoded;
    try{
        decoded = jwt.verify(currentRefreshToken,process.env.JWT_SECRETRT);
    }catch(err){
        if(err.name==="TokenExpiredError")
            throw new AppError("Token expired please login again",401);
        throw new AppError("Invalid token Please login again",401);
    }
    const currentUser = await userModel.findOne({refreshTokens:currentRefreshToken}).select("+refreshTokens");
    if(!currentUser)
        throw new AppError("User does not exist",400);
    const newAccessToken = createAT(currentUser);
    const newRefreshToken = createRT(currentUser);
    const currentRefreshTokenArr = currentUser.refreshTokens.filter(token=>token!==currentRefreshToken);
    currentRefreshTokenArr.push(newRefreshToken);
    currentUser.refreshTokens = currentRefreshTokenArr;
    await currentUser.save();
    currentUser.password = undefined;
    currentUser.refreshTokens = undefined;
    return {currentUser,newAccessToken,newRefreshToken};
}
// ======== logout service ========
export const logoutService = async(refreshToken,id)=>{
    const currentUser = await userModel.findById(id).select("+refreshTokens");
    if(!currentUser)
        throw new AppError("User does not exist",400);
    const currentRefreshTokenArr = currentUser.refreshTokens.filter(token=>token!==refreshToken);
    currentUser.refreshTokens = currentRefreshTokenArr;
    await currentUser.save();
    currentUser.password = undefined;
    currentUser.refreshTokens = undefined;
    return {currentUser};
}

// ======== forgot password service ========
export const forgotPasswordService = async(email)=>{
    const user = await userModel.findOne({email})
    if(!user)
        throw new AppError("User does not exist",400);
    const OTP = await generateOTPService(user.email,"reset");
}

//======== resetPassword service ========
export const resetPasswordService = async(email,plainOTP,newPassword)=>{
    const user = await userModel.findOne({email}).select("+password +OTP +expiryOtp +lastOtpSentAt +passwordChangedAt +refreshTokens");
    if(!user)
        throw new AppError("User does not exist",400);
    const hashOtp = crypto.createHash("sha256").update(plainOTP).digest("hex");
    if(user.OTP !== hashOtp)
        throw new AppError("Invalid OTP Please try again",400);
    if(user.expiryOtp < Date.now())
        throw new AppError("OTP expired Please try again",400);
    user.password = newPassword;
    user.passwordChangedAt = Date.now();
    user.OTP = undefined;
    user.expiryOtp = undefined;
    user.lastOtpSentAt = undefined;
    user.refreshTokens = [];
    await user.save();
    user.password = undefined;
}
//======== delete account service ========
export const deleteAccountService = async(id)=>{
    const user = await userModel.findById(id);
    if(!user)
        throw new AppError("User does not exist",400);
    if(user.role==="vendor")
        await vendorModel.findOneAndDelete({owner:id});
    if(user.image&&user.image.public_id)
        await cloudinary.uploader.destroy(user.image.public_id);
    await userModel.findByIdAndDelete(id);
    user.password = undefined;
    user.refreshTokens = undefined;
}

//======== toggle block account Service ========

export const toggleblockAccountService = async(id)=>{
    const user = await userModel.findById(id);    
    if(!user)
        throw new AppError("User does not exist",400);
    user.isBlocked = !user.isBlocked;
    const message = user.isBlocked ? "Account blocked successfully" : "Account unblocked successfully";
    await user.save();
    user.password = undefined;
    user.refreshTokens = undefined;
    return {message};
}

//======== get me service ========
export const getMeService = async(id)=>{
    const user = await userModel.findById(id).populate("vendorInfo");
    if(!user)
        throw new AppError("User does not exist",400);
    user.password = undefined;
    user.refreshTokens = undefined;
    return user;
}

//========== update Password Service ===========
export const updatePasswordService = async(id,currentPassword,newPassword)=>{
    const currentUser = await userModel.findById(id).select("+password +refreshTokens +passwordChangedAt");
    if(!currentUser)
        throw new AppError("User does not exist",400);
    const isPasswordCorrect = await bcrypt.compare(currentPassword,currentUser.password);
    if(!isPasswordCorrect){
        throw new AppError("Current password is incorrect Please try again",400);
    }
    currentUser.password = newPassword;
    currentUser.passwordChangedAt = Date.now();
    currentUser.refreshTokens = [];
    const refreshToken = createRT(currentUser);
    currentUser.refreshTokens.push(refreshToken);
    const accessToken = createAT(currentUser);
    await currentUser.save();
    currentUser.password = undefined;
    currentUser.passwordChangedAt = undefined;
    currentUser.refreshTokens = undefined;
    return {accessToken,refreshToken};

}

