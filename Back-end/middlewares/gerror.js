const gerror = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if(process.env.NODE_ENV === 'development')
        return res.status(err.statusCode).json({
           success:false,
           stack:err.stack,
           status:err.status,
           message:err.message,
           error:err 
        })

    if(err.isOperational)
        return res.status(err.statusCode).json({
            success:false,
            message:err.message,
            status:err.status,
            statuCode:err.statusCode
        })
    
    return res.status(err.statusCode).json({
        success:false,
        message:"Something went wrong",
        status:err.status,
        statuCode:err.statusCode
    })
}

export default gerror