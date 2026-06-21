import jwt from "jsonwebtoken"
import AppError from "../utils/AppError.js"
import userModel from "../data/models/User.js"
import catchAsync from "../utils/catchAsync.js"
import vendorModel from "../data/models/Vendor.js"

export const protect = catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }else if(req.cookies && req.cookies.accessToken){
        token = req.cookies.accessToken;
    }

    if(!token)
        return next(new AppError("You are not logged in Please login to access this route",401));
    let decoded;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRETAT);
    }catch(err){
        if(err.name==="TokenExpiredError")
            return next(new AppError("Token expired please login again",401));
        return next(new AppError("Invalid token Please login again",401));
    }
    const currentUser = await userModel.findById(decoded.id);
    if(!currentUser)
        return next(new AppError("User does not exist please signup",401));
    if(currentUser.passwordChangedAfter(decoded.iat))
        return next(new AppError("User recently changed password please login again",401));
    if(currentUser.isBlocked)
        return next(new AppError("User is blocked please contact admin",403));
    req.user = currentUser;
    next();
})


export const restrictTo = (...roles)=>{
    return catchAsync(async(req,res,next)=>{
        if(!roles.includes(req.user.role))
            return next(new AppError("You do not have permission to perform this action",403));
        next();
    })
}

export const restrictToVendorApproved = catchAsync(async(req,res,next)=>{
    if(req.user.role !== "vendor") return next();
    const vendor = await vendorModel.findOne({owner:req.user._id});
    if(!vendor.isApproved)
        return next(new AppError("Vendor is not approved please wait for approval",403));
    req.vendor = vendor;
    next();
})