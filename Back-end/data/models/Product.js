import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        validate:{
            validator:function(val){
                return val.length>=1 && val.length<=5
            },
            message:"Product must have at least one image and at most 5 images"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min:[0,"Quantity must be greater than 0"]
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    discount:{
        percentage:{
            type: Number,
            min:[0,"Percentage must be greater than 0"],
            default: 0
        },
        isActive:{
            type: Boolean,
            default: false
        },
        startDate: {
            type: Date,
            default: null
        },
        endDate: {
            type: Date,
            default: null
        }
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        versionKey: false,
    }
);
productSchema.virtual("salePrice").get(function () {
    if(this.discount && this.discount.isActive)
        return this.price*(1-this.discount.percentage/100);
    return this.price
});
const productModel = mongoose.model("Product", productSchema, "products");
export default productModel;