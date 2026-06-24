import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    storeAdress:{
        type: String,
        required: true
    },
    storePhone:{
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
    storeName: {
        type: String,
        required: true
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