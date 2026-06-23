import { registerService,verifyEmailService,updatePasswordService ,generateOTPService,loginService,generateNewAccessTokenService,logoutService,forgotPasswordService,resetPasswordService,deleteAccountService,toggleblockAccountService,getMeService} from "./auth.service.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/AppError.js";

//======== helper function for cookies ========
const setCookies = (res,refreshToken,accessToken)=>{
    const cookieOptions = {
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }
    res.cookie("refreshToken",refreshToken,{...cookieOptions ,maxAge:7*24*60*60*1000});
    res.cookie("accessToken",accessToken,{...cookieOptions,maxAge:15*60*1000});
}

//======== user registeration controller ========
export const register = catchAsync(async(req,res,next)=>{
    const {newUser,message} = await registerService(req.body,req.file);
    res.status(201).json({newUser,message,Navigate:"/verify-otp"});
})
//======== verify email controller ========
export const verifyEmail = catchAsync(async (req,res,next)=>{
    const {user,refreshToken,accessToken} = await verifyEmailService(req.body.email,req.body.otp);
    setCookies(res,refreshToken,accessToken);
    res.status(200).json({user,message:"Email verified successfully",Navigate:"/ or /home"});
})
//======== generate otp controller ========
export const generateOTP = catchAsync(async(req,res,next)=>{
    const OTP = await generateOTPService(req.body.email,"verify");
    res.status(200).json({message:"OTP sent successfully"});
}) 

export const generateOTPreset = catchAsync(async(req,res,next)=>{
    const OTP = await generateOTPService(req.body.email,"reset");
    res.status(200).json({message:"OTP sent successfully"});
})
//======== login controller ========
export const login = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body;
    const {user,refreshToken,accessToken} = await loginService (email,password)
    setCookies(res,refreshToken,accessToken);
    res.status(200).json({user,message:"Login successful",Navigate:"/ or /home"});
})
//======== generate new access token controller ========
export const generateNewAccessToken = catchAsync(async(req,res,next)=>{
    if(!req.cookies.refreshToken)
        return next(new AppError("You are not logged in Please login to access this route",401));
    const refreshToken = req.cookies.refreshToken;
    const {currentUser,newAccessToken,newRefreshToken} = await generateNewAccessTokenService(refreshToken);
    setCookies(res,newRefreshToken,newAccessToken);
    res.status(200).json({currentUser,message:"Access token generated successfully",Navigate:"/ or /home"});
})

export const logout = catchAsync(async(req,res,next)=>{
    if(!req.cookies.refreshToken)
        return next(new AppError("You are not logged in Please login to access this route",401));
    const refreshToken = req.cookies.refreshToken;
    const {currentUser} = await logoutService(refreshToken,req.user._id);
    const cookieOptions = {
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }
    res.clearCookie("refreshToken",cookieOptions);
    res.clearCookie("accessToken",cookieOptions);
    res.status(200).json({currentUser,message:"Logout successful",Navigate:"/Login"});
})

//======== forgot password controller ========
export const forgotPassword = catchAsync(async(req,res,next)=>{
    await forgotPasswordService(req.body.email);
    res.status(200).json({message:"OTP sent successfully",Navigate:"/reset-password"});
})

// ========= reset password controller ========
export const resetPassword = catchAsync(async(req,res,next)=>{
    await resetPasswordService(req.body.email,req.body.otp,req.body.password);
    res.clearCookie("refreshToken",{httpOnly:true,secure:true,sameSite:"none"});
    res.clearCookie("accessToken",{httpOnly:true,secure:true,sameSite:"none"});
    res.status(200).json({message:"Password reset successful please login",Navigate:"/Login"});
})
//======== delete My account controller ========
export const deleteMyAccount = catchAsync(async(req,res,next)=>{
    await deleteAccountService(req.user._id);
    res.clearCookie("refreshToken",{httpOnly:true,secure:true,sameSite:"none"});
    res.clearCookie("accessToken",{httpOnly:true,secure:true,sameSite:"none"});
    res.status(200).json({message:"Account deleted successfully",Navigate:"/Login"});
})
//======== delete account controller ========
export const deleteAccount = catchAsync(async(req,res,next)=>{
    await deleteAccountService(req.params.id);
    res.clearCookie("refreshToken",{httpOnly:true,secure:true,sameSite:"none"});
    res.clearCookie("accessToken",{httpOnly:true,secure:true,sameSite:"none"});
    res.status(200).json({message:"Account deleted successfully"});
})

//======== block account controller ========
export const toggleblockAccount = catchAsync(async(req,res,next)=>{
    const {message} = await toggleblockAccountService(req.params.id);
    res.status(200).json({message});
})
//======== get me controller ========
export const getMe = catchAsync(async(req,res,next)=>{
    const user = await getMeService(req.user._id);
    res.status(200).json({user});
})

//======== update password controller ========
export const updatePassword = catchAsync(async(req,res,next)=>{
   const {accessToken,refreshToken} =  await updatePasswordService(req.user._id,req.body.currentPassword,req.body.newPassword);
    setCookies(res,refreshToken,accessToken);
    res.status(200).json({message:"Password updated successfully",Navigate:"/ or /home"});
})