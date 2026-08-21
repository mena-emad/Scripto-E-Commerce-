import joi from "joi";
const vendorUpdateProfileJoi = joi.object({
    storeName:joi.string(),
    storeEmail:joi.string().email().required().messages({
        "string.email":"Email is invalid",
    }),
    storePhone:joi.string(),
    storeDescription:joi.string(),
    storeAddress:joi.string(),
})
export default vendorUpdateProfileJoi