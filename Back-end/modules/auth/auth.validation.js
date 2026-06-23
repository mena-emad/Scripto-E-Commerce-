import joi from "joi"
const userJoi = joi.object({
    name:joi.string().required().messages({
        "string.empty":"Name is required",
        "any.required":"Name is required",
    }),
    email:joi.string().email().required().messages({
        "string.empty":"Email is required",
        "string.email":"Email is invalid",
        "any.required":"Email is required",
    }),
    password:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"password").messages({
        "string.empty":"Password is required",
        "string.pattern.name":"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "any.required":"Password is required",
    }),
    confirmPassword:joi.string().required().valid(joi.ref("password")).messages({
        "string.empty":"Confirm password is required",
        "any.only":"Passwords do not match",
        "any.required":"Confirm password is required",
    }),
    role:joi.string().valid("user","vendor").default("user").messages({
        "any.only":"Role is invalid cannot signup as admin",
    }),
    storeName:joi.when('role', { is: 'vendor', then: joi.string().required().messages({
        "string.empty":"Store name is required",
        "any.required":"Store name is required",
    })}),
    storeAdress:joi.when('role', { is: 'vendor', then: joi.string().required().messages({
        "string.empty":"Store address is required",
        "any.required":"Store address is required",
    })}),
    storePhone:joi.when('role', { is: 'vendor', then: joi.string().required().messages({
        "string.empty":"Store phone number is required",
        "any.required":"Store phone number is required",
    })}),
    storeEmail:joi.when('role', { is: 'vendor', then: joi.string().required().messages({
        "string.empty":"Store email is required",
        "any.required":"Store email is required",
    })}),
    storeDescription:joi.when('role', { is: 'vendor', then: joi.string().required().messages({
        "string.empty":"Store description is required from joi",
        "any.required":"Store description is required from joi",
    })})
})

const verifyEmailJoi = joi.object({
    email:joi.string().email().required().messages({
        "string.empty":"Email is required",
        "string.email":"Email is invalid",
        "any.required":"Email is required",
    }),
    otp:joi.string().required().length(6).messages({
        "string.empty":"OTP is required",
        "any.required":"OTP is required",
        "string.length":"OTP must be 6 digits",
    }),
})

const generateOTPJoi = joi.object({
    email:joi.string().email().required().messages({
        "string.empty":"Email is required",
        "string.email":"Email is invalid",
        "any.required":"Email is required",
    }),
})
const loginJoi = joi.object({
    email:joi.string().email().required().messages({
        "string.empty":"Email is required",
        "string.email":"Email is invalid",
        "any.required":"Email is required",
    }),
    password:joi.string().required().messages({
        "string.empty":"Password is required",
        "any.required":"Password is required",
    }),
})
// export const generateOTPresetJoi = joi.object({
//     email:joi.string().email().required().messages({
//         "string.empty":"Email is required",
//         "string.email":"Email is invalid",
//         "any.required":"Email is required",
//     }),
// })

export const forgotPasswordJoi = joi.object({
    email:joi.string().email().required().messages({
        "string.empty":"Email is required",
        "string.email":"Email is invalid",
        "any.required":"Email is required",
    }),
})

export const updatePassowrdJoi = joi.object({
    currentPassword:joi.string().required().messages({
        "string.empty":"Current password is required",
        "any.required":"Current password is required",
    }),
    newPassword:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"password").messages({
        "string.empty":"Password is required",
        "string.pattern.name":"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "any.required":"Password is required",
    }),
    confirmPassword:joi.string().required().valid(joi.ref("newPassword")).messages({
        "string.empty":"Confirm password is required",
        "any.only":"Passwords do not match",
        "any.required":"Confirm password is required",
    })
})

export const resetPasswordJoi = joi.object({
    email:joi.string().email().required().messages({
        "string.empty":"Email is required",
        "string.email":"Email is invalid",
        "any.required":"Email is required",
    }),
    otp:joi.string().required().length(6).messages({
        "string.empty":"OTP is required",
        "any.required":"OTP is required",
        "string.length":"OTP must be 6 digits",
    }),
    password:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"password").messages({
        "string.empty":"Password is required",
        "string.pattern.name":"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "any.required":"Password is required",
    }),
    confirmPassword:joi.string().required().valid(joi.ref("password")).messages({
        "string.empty":"Confirm password is required",
        "any.only":"Passwords do not match",
        "any.required":"Confirm password is required",
    })
})
export  {userJoi,verifyEmailJoi,generateOTPJoi,loginJoi}