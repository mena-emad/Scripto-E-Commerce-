import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true,
        unique: true
    },
    storeAdress:{
        type: String,
        required: true
    },
    storePhone:{
        type: String,
        required: true
    },
    storeEmail:{
        type: String,
        required: true
    },
    storeLogo: {
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    storeDescription: {
        type: String,
        required: true
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }

},{
    timestamps: true,
    versionKey: false,
})

const vendorModel = mongoose.model("Vendor",vendorSchema,"vendors")
export default vendorModel