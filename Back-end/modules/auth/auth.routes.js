import { register,verifyEmail,generateOTP,generateNewAccessToken,login,logout,generateOTPreset,forgotPassword,resetPassword,deleteMyAccount ,deleteAccount,toggleblockAccount,getMe} from "./auth.controller.js";
import  {generateOTPJoi, userJoi,verifyEmailJoi,loginJoi,forgotPasswordJoi,resetPasswordJoi}  from "./auth.validation.js"
import { restrictTo, restrictToVendorApproved } from "../../middlewares/auth.js";
import validation from "../../middlewares/validation.js";
import express from "express";
import { protect } from "../../middlewares/auth.js";
import  uplaod  from "../../utils/cloudinary.js";
const authRouter = express.Router();
/**
||||||||||||||||||
||||||||||||||||||
| General routes |
||||||||||||||||||
||||||||||||||||||
 * **/
// ========= signup routes =========
authRouter.post("/signup",uplaod.single("profileImage"),validation(userJoi),register);
// ========= verify email routes =========
authRouter.post("/verify-otp",validation(verifyEmailJoi),verifyEmail);

// ======== generate OTP routes =========
authRouter.post("/generate-otp",validation(generateOTPJoi),generateOTP); //for verify email
// authRouter.post("/generate-otp-reset",validation(generateOTPresetJoi),generateOTPreset); //for reset password


//======== generate new access token routes =========
authRouter.post("/generate-new-access-token",generateNewAccessToken);

//======== login routes =========
authRouter.post("/login",validation(loginJoi),login);

// ======== forgot password routes =========
authRouter.post("/forgot-password",validation(forgotPasswordJoi),forgotPassword);

// ======== reset password routes =========
authRouter.post("/reset-password",validation(resetPasswordJoi),resetPassword);

/**
||||||||||||||||||
||||||||||||||||||
|Protected routes|
||||||||||||||||||
||||||||||||||||||
**/
authRouter.use(protect);
authRouter.post("/logout" , logout);
authRouter.delete("/delete-my-account",deleteMyAccount)
authRouter.get("/me",getMe)
// authRouter.get("/get-vendor",restrictTo("vendor"),restrictToVendorApproved,getMe)
authRouter.use(restrictTo("admin"));
authRouter.delete("/delete-account/:id",deleteAccount);
authRouter.patch("/block-account/:id",toggleblockAccount);

export default authRouter

