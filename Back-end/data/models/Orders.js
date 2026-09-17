import mongoose from "mongoose";

const parentOrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    globalStatus: {
        type: String,
        enum: ["Pending", "Partially Shipped", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    shippingAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Card"],
        required: true
    },
    products:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            vendor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vendor",
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            category:{
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });


const subOrderSchema = new mongoose.Schema({
    parentOrder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ParentOrder",
        required:true
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            name:{
                type:String,
                required:true
            },
            category:{
                type:String,
                required:true
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true
    },
    totalAmount: {
        type: Number,
        required: true
    }
})
export const parentOrderModel = mongoose.model("ParentOrder", parentOrderSchema);
export const subOrderModel = mongoose.model("SubOrder", subOrderSchema);