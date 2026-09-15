import joi from "joi";
const vendorUpdateProfileJoi = joi.object({
    storeName:joi.string(),
    storeEmail:joi.string().email().optional().messages({
        "string.email":"Email is invalid",
    }),
    storePhone:joi.string(),
    storeDescription:joi.string(),
    storeAdress:joi.string(),
})
export default vendorUpdateProfileJoi