import jwt from "jsonwebtoken"

 const createRT = (user)=>{
    return jwt.sign({id:user._id , role:user.role},process.env.JWT_SECRETRT,{expiresIn:"7d"})
}

 const createAT = (user)=>{
    return jwt.sign({id:user._id , role:user.role},process.env.JWT_SECRETAT,{expiresIn:"15m"})
}


export {createRT , createAT}