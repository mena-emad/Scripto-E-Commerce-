import bcrypt from "bcrypt"
const hashPassword = (schema)=>{
    schema.pre("save",async function(){
        if(!this.isModified("password")) return;
        this.password = await bcrypt.hash(this.password,12)
        this.passwordChangedAt = Date.now()-1000;
    })
}

export default hashPassword