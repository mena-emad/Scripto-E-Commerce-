import AppError from "../utils/AppError.js";

// ======== validation middleware ========
const validation = (joiSchema)=>{
    return(req,res,next)=>{
         if(!req.body || Object.keys(req.body).length ===0) return next(new AppError("No data found",400))
        const {error} = joiSchema.validate(req.body,{abortEarly:false})
        if(error) {
            const errors= error.details.map(e=>e.message).join(", ");
            return next(new AppError(errors,400))
        }
        next()
    }

    
}

export default validation