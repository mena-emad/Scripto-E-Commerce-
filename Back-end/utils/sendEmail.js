import nodemailer from "nodemailer";
import  {emailTemplate}  from "./templates/template.js";
import {forgotPasswordTemplate} from "./templates/forgetTemplate.js";
const sendEmail = async (options)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })

    const mailOptions = {
        from:process.env.EMAIL,
        to:options.email,
        subject:"Please verify your email",
        html:options.type ==="verify"?emailTemplate(options.name,options.OTP):forgotPasswordTemplate(options.name,options.OTP)
    }

    await transporter.sendMail(mailOptions);
}

export default sendEmail