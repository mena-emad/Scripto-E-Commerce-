import joi from "joi";

const productsJoi = joi.object({
    name: joi.string().trim().required().messages({
        "string.empty": "Name is required",
        "any.required": "Name is required",
    }),
    quantity: joi.number().integer().min(0).required().messages({
        "number.base": "Quantity must be a number",
        "number.min": "Quantity cannot be less than 0",
        "any.required": "Quantity is required",
    }),
    price: joi.number().positive().required().messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be a positive number",
        "any.required": "Price is required",
    }),
    description: joi.string().trim().required().messages({
        "string.empty": "Description is required",
        "any.required": "Description is required",
    }),
    category: joi.string().trim().required().messages({
        "string.empty": "Category is required",
        "any.required": "Category is required",
    }),
    images: joi.array().items(joi.string().uri()).min(1).max(5).required().messages({
        "array.base": "Images must be an array of URLs",
        "array.min": "At least 1 image is required",
        "array.max": "Maximum 5 images are allowed",
        "any.required": "Images are required",
    }),
    
    vendor: joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.pattern.base": "Invalid Vendor ID format",
        "any.required": "Vendor ID is required",
    }),
    
    discount: joi.object({
        percentage: joi.number().min(0).max(100).default(0),
        isActive: joi.boolean().default(false),
        startDate: joi.date().allow(null).default(null),
        endDate: joi.date().allow(null).min(joi.ref("startDate")).default(null).messages({
            "date.min": "End date must be after start date"
        })
    }).default()
});

export default productsJoi;