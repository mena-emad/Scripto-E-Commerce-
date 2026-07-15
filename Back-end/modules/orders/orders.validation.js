import Joi from "joi";

// Helper to validate MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const validateObjectId = (value, helpers) => {
    if (!value.match(objectIdRegex)) {
        return helpers.message('"{{#label}}" must be a valid MongoDB ObjectId');
    }
    return value;
};

/**
 * 1. Validation for the Checkout Request (req.body)
 * The client only sends transactional data. Product details are safely fetched from the Cart.
 */
export const makeOrderValidation = Joi.object({
    shippingAddress: Joi.string()
        .trim()
        .min(10)
        .max(500)
        .required()
        .messages({
            "string.empty": "Shipping address cannot be empty",
            "string.min": "Shipping address must be detailed (at least 10 characters)",
            "any.required": "Shipping address is required"
        }),

    paymentMethod: Joi.string()
        .valid("COD", "Card")
        .required()
        .messages({
            "any.only": "Payment method must be either 'COD' or 'Card'",
            "any.required": "Payment method is required"
        }),
        
});


/**
 * 2. Full Parent Order Validation (Internal DB Document Check)
 */
export const parentOrderFullValidation = Joi.object({
    user: Joi.string()
        .custom(validateObjectId)
        .required()
        .messages({
            "any.required": "User ID is required"
        }),

    totalPrice: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.min": "Total price cannot be negative",
            "any.required": "Total price is required"
        }),

    totalAmount: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.min": "Total amount cannot be negative",
            "any.required": "Total amount is required"
        }),

    globalStatus: Joi.string()
        .valid("Pending", "Partially Shipped", "Shipped", "Delivered", "Cancelled")
        .default("Pending"),

    shippingAddress: Joi.string()
        .trim()
        .required()
        .messages({
            "any.required": "Shipping address is required"
        }),

    paymentMethod: Joi.string()
        .valid("COD", "Card")
        .required()
        .messages({
            "any.only": "Invalid payment method",
            "any.required": "Payment method is required"
        }),

    products: Joi.array()
        .items(
            Joi.object({
                product: Joi.string().custom(validateObjectId).required(),
                quantity: Joi.number().integer().min(1).required(),
                vendor: Joi.string().custom(validateObjectId).required(),
                price: Joi.number().min(0).required()
            })
        )
        .min(1)
        .required()
        .messages({
            "array.min": "Order must contain at least one product",
            "any.required": "Products list is required"
        })
});


/**
 * 3. Sub-Order Validation
 */
export const subOrderValidation = Joi.object({
    parentOrder: Joi.string()
        .custom(validateObjectId)
        .required()
        .messages({
            "any.required": "Parent order ID is required"
        }),

    status: Joi.string()
        .valid("Pending", "Processing", "Shipped", "Delivered", "Cancelled")
        .default("Pending"),

    vendor: Joi.string()
        .custom(validateObjectId)
        .required()
        .messages({
            "any.required": "Vendor ID is required"
        }),

    products: Joi.array()
        .items(
            Joi.object({
                product: Joi.string().custom(validateObjectId).required(),
                quantity: Joi.number().integer().min(1).required(),
                price: Joi.number().min(0).required(),
                vendor: Joi.string().custom(validateObjectId).required()
            })
        )
        .min(1)
        .required()
        .messages({
            "array.min": "Sub-order must contain at least one product",
            "any.required": "Products list is required"
        }),

    totalPrice: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.min": "Total price cannot be negative",
            "any.required": "Total price is required"
        }),

    totalAmount: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.min": "Total amount cannot be negative",
            "any.required": "Total amount is required"
        })
});