import joi from "joi";
//======== cart validation =========
export const cartJoi = joi.object({
    productId:joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.empty":"Product id is required",
        "any.required":"Product id is required",
    }),
    quantity:joi.number().integer().min(1).required().messages({
        "number.base":"Quantity must be a number",
        "number.min":"Quantity must be greater than 0",
        "any.required":"Quantity is required",
    })
})

//======== delete from cart validation =========
export const removeFromCartJoi = joi.object({
    productId:joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.empty":"Product id is required",
        "any.required":"Product id is required",
    })
})
