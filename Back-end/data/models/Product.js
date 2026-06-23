import mongoose from "mongoose";
import slugify from "slugify";
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
    slug: {
        type: String,
        unique: true
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
    images: [
        {
            url:{
                type:String,
                required:true
            },
            public_id:{
                type:String,
                required:true
            }
        }
    ],
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
            max:[100,"Percentage must be less than 100"],
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

productSchema.pre("save",function(next){
    if(this.isModified("name")){
        this.slug = slugify(this.name,{lower:true,strict:true});
    }
    next();
    
})
const productModel = mongoose.model("Product", productSchema, "products");
export default productModel;