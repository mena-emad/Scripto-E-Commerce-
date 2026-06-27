import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be at least 1"],
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
            vendor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vendor",
                required: true
            }
        }
    ],
    // totalPriceBeforeDiscount: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },
    // totalPriceAfterDiscount: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // }
    totalPrice:{
        type: Number,
        required: true,
        min: [0, "Total price must be at least 0"],
        default: 0
    }
},{timestamps:true , versionKey:false});
const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;