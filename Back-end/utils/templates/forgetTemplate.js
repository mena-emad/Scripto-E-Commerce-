export const forgotPasswordTemplate = (name, otp) => {
    return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إعادة تعيين كلمة المرور - Scripto</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #0b0f19;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #ffffff;
            }
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background: #111827;
                border: 1px solid #1f2937;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
            }
            .header {
                background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
                font-weight: 700;
                color: #0b0f19;
                letter-spacing: 1px;
            }
            .content {
                padding: 40px 30px;
                text-align: right;
                line-height: 1.8;
            }
            .content h2 {
                color: #00f2fe;
                font-size: 22px;
                margin-bottom: 20px;
            }
            .content p {
                color: #9ca3af;
                font-size: 16px;
                margin-bottom: 30px;
            }
            .otp-container {
                background: #1f2937;
                border: 2px dashed #00f2fe;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                margin: 30px 0;
            }
            .otp-code {
                font-family: 'Courier New', Courier, monospace;
                font-size: 36px;
                font-weight: bold;
                color: #ffffff;
                letter-spacing: 8px;
                display: inline-block;
            }
            .footer {
                background: #0b0f19;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #1f2937;
            }
            .footer p {
                margin: 0;
                color: #4b5563;
                font-size: 13px;
            }
            .warning-text {
                color: #ef4444 !important;
                font-size: 14px !important;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Scripto</h1>
            </div>
            
            <div class="content">
                <h2>مرحباً ${name}،</h2>
                <p>لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك على Scripto. لا داعي للقلق، استخدم رمز التحقق (OTP) التالي لإتمام العملية:</p>
                
                <div class="otp-container">
                    <div class="otp-code">${otp}</div>
                </div>
                
                <p>هذا الرمز صالح لمدة 15 دقيقة فقط لحماية حسابك.</p>
                <p class="warning-text">⚠️ إذا لم تقم بطلب هذا الرمز، يمكنك تجاهل هذا الإيميل بأمان وتأكد أن حسابك في أمان.</p>
            </div>
            
            <div class="footer">
                <p>&copy; 2026 Scripto. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};