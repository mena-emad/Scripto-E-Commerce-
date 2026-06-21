export const emailTemplate = (name, otp) => {
    return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تأكيد الحساب - Scripto</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f6f9;
                margin: 0;
                padding: 0;
                direction: rtl;
                text-align: right;
            }
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            }
            .header {
                background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                padding: 40px 20px;
                text-align: center;
            }
            .logo-container {
                display: inline-block;
                margin-bottom: 15px;
            }
            .logo-icon {
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                color: white;
                font-weight: bold;
                font-size: 24px;
                padding: 10px 20px;
                border-radius: 12px;
                letter-spacing: 1px;
                box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
                display: inline-block;
                font-family: 'Arial Black', Gadget, sans-serif;
            }
            .logo-text {
                color: #ffffff;
                font-size: 14px;
                display: block;
                margin-top: 8px;
                letter-spacing: 2px;
                opacity: 0.8;
            }
            .content {
                padding: 40px 30px;
                color: #334155;
                line-height: 1.8;
            }
            .welcome-title {
                font-size: 24px;
                color: #0f172a;
                margin-top: 0;
                font-weight: 700;
            }
            .highlight {
                color: #4f46e5;
                font-weight: bold;
            }
            .otp-box {
                background-color: #f8fafc;
                border: 2px dashed #cbd5e1;
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                margin: 30px 0;
            }
            .otp-code {
                font-size: 36px;
                font-weight: 800;
                letter-spacing: 8px;
                color: #1e1b4b;
                margin: 0;
                font-family: monospace;
            }
            .timer-text {
                font-size: 13px;
                color: #64748b;
                margin-top: 10px;
            }
            .footer {
                background-color: #f8fafc;
                padding: 24px 20px;
                text-align: center;
                font-size: 12px;
                color: #94a3b8;
                border-top: 1px solid #e2e8f0;
                line-height: 1.6;
            }
            .developer-credit {
                margin-top: 8px;
                font-size: 13px;
                color: #64748b;
            }
            .developer-link {
                color: #4f46e5;
                text-decoration: none;
                font-weight: 600;
            }
            .developer-link:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>

        <div class="email-container">
            <div class="header">
                <div class="logo-container">
                    <div class="logo-icon">Scripto</div>
                    <span class="logo-text">NEXT-GEN ECOMMERCE</span>
                </div>
            </div>

            <div class="content">
                <h1 class="welcome-title">أهلاً بك، يا ${name}! 🚀</h1>
                <p>خطوة واحدة تفصلك عن الانطلاق في تجربة تسوق فريدة ومخصصة ليك تماماً مع <span class="highlight">Scripto</span>. إحنا متحمسين جداً لوجودك معانا!</p>
                
                <p>علشان نأمن حسابك ونضمن إنك تستمتع بكل الميزات والعروض الحصرية فوراً، يرجى استخدام رمز التحقق (OTP) التالي:</p>
                
                <div class="otp-box">
                    <p class="otp-code">${otp}</p> 
                    <p class="timer-text">⚠️ هذا الرمز صالح لمدة 15 دقائق فقط، لا تشاركه مع أي شخص.</p>
                </div>

                <p>جهّز نفسك لرحلة تسوق مفيش زيها، مستنيينك جوه المنصة لشحن أول طلبية!</p>
                
                <p>عاش،<br><strong>فريق عمل Scripto 🔥</strong></p>
            </div>

            <div class="footer">
                <p>© 2026 Scripto. جميع الحقوق محفوظة.</p>
                <p class="developer-credit">
                    قام بتطوير المنصة المهندس: 
                    <a href="https://menaemad.netlify.app" target="_blank" class="developer-link">مينا عماد سوارس</a>
                </p>
            </div>
        </div>

    </body>
    </html>
    `;
};

