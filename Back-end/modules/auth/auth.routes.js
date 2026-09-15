import { register,verifyEmail,updatePassword,updateProfile,generateOTP,generateNewAccessToken,login,logout,generateOTPreset,forgotPassword,resetPassword,deleteMyAccount ,deleteAccount,toggleblockAccount,getMe} from "./auth.controller.js";
import  {generateOTPJoi,updatePassowrdJoi,updateProfileJoi, userJoi,verifyEmailJoi,loginJoi,forgotPasswordJoi,resetPasswordJoi}  from "./auth.validation.js"
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

authRouter.post("/logout" , protect,logout);
authRouter.patch('/update-password',protect,validation(updatePassowrdJoi),updatePassword);
authRouter.patch('/profile',protect,uplaod.single("profileImage"),validation(updateProfileJoi),updateProfile);
authRouter.delete("/delete-my-account",protect,deleteMyAccount)
authRouter.get("/me",protect,getMe)

authRouter.delete("/delete-account/:id",protect,restrictTo("admin"),deleteAccount);
authRouter.patch("/block-account/:id",protect,restrictTo("admin"),toggleblockAccount);

export default authRouter

