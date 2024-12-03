import nodemailer, { Transporter } from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();
import { logger } from '../logger/logger';
import { RES_TYPES, ERRORTYPES, NotificationTypes } from '../constant';
import { AppError } from '../utils';

const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

export class SendNotificationEmail {
    constructor(types: string, emails: string, extra: any) {
        this.sendEmail(types, emails, extra);
    }

    async sendEmail(types: string, emails: string, extra: any) {
        try {
            let subject = '',
                htmlContent = '';
            switch (types) {
                case NotificationTypes.ACTIVE_ACCOUNT:
                    subject = 'Account Activated';
                    htmlContent = `
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <title>Account Verified</title>
                                    <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        line-height: 1.6;
                                    }

                                    .container {
                                        max-width: 600px;
                                        margin: auto;
                                        padding: 20px;
                                        border: 1px solid #ccc;
                                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                    }

                                    h1 {
                                        color: #333;
                                    }

                                    p {
                                        margin-bottom: 20px;
                                    }

                                    .button {
                                        display: inline-block;
                                        padding: 10px 20px;
                                        background-color: #007bff;
                                        color: #fff;
                                        text-decoration: none;
                                        border-radius: 4px;
                                    }

                                    .footer {
                                        margin-top: 20px;
                                        border-top: 1px solid #ccc;
                                        padding-top: 20px;
                                        font-size: 0.9em;
                                        color: #666;
                                    }
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                    <h1>Account Verified</h1>
                                    <p>Dear ${extra.fistname},</p>
                                    <p>
                                        We are pleased to inform you that your account has been successfully
                                        verified by our admin team. You can now access all the features and
                                        functionalities available for professionals.
                                    </p>
                                    <p>To get started, please click the button below:</p>
                                    <a href="${process.env.SHIDDUCH_URL}/app/project/dashboard" class="button">Access Dashboard</a>
                                    <p>
                                        If you encounter any issues or have questions, feel free to contact our
                                        support team. We're here to help!
                                    </p>
                                    <div class="footer">
                                        <p>Thank you for choosing our platform.</p>
                                        <p>Best regards,<br />Your Shidduch Team</p>
                                    </div>
                                    </div>
                                </body>
                                </html>
                               `;
                    break;

                case NotificationTypes.FORGOT_PSW:
                    subject = extra.language === 'en' ? 'Forget Password' : 'TGX アプリパスワード認証のご連絡';
                    htmlContent = extra.language === 'en' ? `
                       <html>
                                <head>
                                    <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #fff;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .email-container {
                                        background-color: #1D1324;
                                        padding: 20px;
                                        border-radius: 10px;
                                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                        margin: 20px auto;
                                        max-width: 600px;
                                        text-align: center;
                                    }
                                    .header {
                                        /* background-color: #070118; */
                                        color: #ffffff;
                                        padding: 10px 0;
                                        border-radius: 10px;
                                    }
                                    .header h1 {
                                        font-size: 25px;
                                        margin: 0;
                                    }
                                    .content {
                                        padding-top: 20px;
                                    }
                                    .content p {
                                        /*padding-top: 20px;*/
                                        color: #fff;
                                    }
                                    .otp-message {
                                        font-weight: bold;
                                        font-size: 24px;
                                        color: #070118;
                                    }
                                    .footer {
                                        padding-top: 20px;
                                        color: #b3b3b3;
                                    }
                                    </style>
                                </head>
                                <body>
                                    <div class="email-container">
                                    <div class="header">
                                        <h1>Reset Password</h1>
                                    </div>
                                    <div class="content">
                                        <p>Hello there!</p>
                                        <p>
                                        This is your one-time password (OTP) to verify your account. Please
                                        enter this code within the next 3 minutes:
                                        </p>
                                        <p class="otp-message">${extra.otp}</p>
                                        <p>If you did not request an OTP, please ignore this email.</p>
                                    </div>
                                    <div class="footer">
                                        <p>Regards,</p>
                                        <p>Your TGX Team</p>
                                    </div>
                                    </div>
                                </body>
                                </html>`
                                : `<html>
                                <head>
                                    <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #fff;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .email-container {
                                        background-color: #1D1324;
                                        padding: 20px;
                                        border-radius: 10px;
                                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                        margin: 20px auto;
                                        max-width: 600px;
                                        text-align: center;
                                    }
                                    .header {
                                        /* background-color: #070118; */
                                        color: #ffffff;
                                        padding: 10px 0;
                                        border-radius: 10px;
                                    }
                                    .header h1 {
                                        font-size: 25px;
                                        margin: 0;
                                    }
                                    .content {
                                        padding-top: 20px;
                                    }
                                    .content p {
                                        /*padding-top: 20px;*/
                                        color: #fff;
                                    }
                                    .otp-message {
                                        font-weight: bold;
                                        font-size: 24px;
                                        color: #070118;
                                    }
                                    .footer {
                                        padding-top: 20px;
                                        color: #b3b3b3;
                                    }
                                    </style>
                                </head>
                                <body>
                                    <div class="email-container">
                                    <div class="header">
                                        <h1>パスワードのリセット </h1>
                                    </div>
                                    <div class="content">
                                        <p>こんにちは！</p>
                                        <p>
                                        アカウントの確認するため、ワンタイムパスワードを発行いたしました。3分以内にこのコードを入力してください：
                                        </p>
                                        <p class="otp-message">${extra.otp}</p>
                                        <p>もしワンタイムパスワードをリクエストしていない場合は、このメールを無視してください。</p>
                                    </div>
                                    <div class="footer">
                                        <p>よろしくお願いいたします。</p>
                                        <p>TGXチーム</p>
                                    </div>
                                    </div>
                                </body>
                                </html>

`;
                    break;

                case NotificationTypes.SEND_CREDENTIAL:
                    subject = 'TGX Login Credential ';
                    htmlContent = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                body {
                                    background-color: #f9f9f9;
                                    margin: 0;
                                    padding: 0;
                                    font-family: Arial, sans-serif;
                                    color: #333;
                                }
                                .email-container {
                                    background-color: #1D1324;
                                    width: 90%;
                                    max-width: 600px;
                                    margin: 20px auto;
                                    padding: 20px;
                                    border-radius: 10px;
                                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                }
                                h1 {
                                    color: #fff;
                                    text-align: center;
                                    font-size: 24px;
                                    margin-bottom: 20px;
                                }
                                p {
                                    color: #fff;
                                    line-height: 1.5;
                                    margin: 10px 0;
                                }
                                .button {
                                    text-align: center;
                                    margin: 20px 0;
                                }
                                a {
                                    background-color: #070118;
                                    color: white;
                                    text-decoration: none;
                                    padding: 10px 20px;
                                    border-radius: 8px;
                                    display: inline-block;
                                    border: 1px solid #615E83;
                                }
                                strong {
                                    color: #fff;
                                }
                                .support-info p {
                                    margin-top: 20px;
                                    color: #b3b3b3;
                                }
                                .footer {
                                    margin-top: 20px;
                                    color: #b3b3b3;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="email-container">
                                <h1>TGX Login Credentials</h1>
                                <p>Hello there!</p>
                                <p>Your login credentials for the TGX system are provided below:</p>
                                <p><strong>Email:</strong> <b>${emails}</b></p>
                                <p><strong>Password:</strong> <b>${extra['password']}</b></p>
                                <div class="button">
                                    <a href="${process.env.STORE_WEB_URL}/sign-in">Visit TGX Store</a>
                                </div>
                                <p>Please keep these credentials secure and do not share them with others.</p>
                                <p>If you have any questions or need assistance, please feel free to contact our support team.</p>
                                <div class="support-info">
                                    <p>Regards,</p>
                                    <p>Your TGX Team</p>
                                </div>
                            </div>
                        </body>
                        </html>
`;
                    break;

                case NotificationTypes.SEND_PROFESSIONAL_SIGNUP_NOTIFICATION:
                    subject = 'Signed up new shadchan ';
                    htmlContent = `<html>
            <head>
                <style>
                    body {
                        background-color: #f0f0f0;
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                    }
                    .email-container {
                        background-color: #fff;
                        width: 80%;
                        margin: 20px auto;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #3498db;
                        text-align: center;
                    }
                    p {
                        color: #555;
                        line-height: 1.2;
                    }
                     .button {
                         display: inline-block;
                         padding: 10px;
                         background-color: #007bff;
                         color: #fff;
                         text-decoration: none;
                         border-radius: 4px;
                         font-size:12px;
                         height: 10px;
                    }
                    strong {
                        color: #333;
                    }
                    .support-info {
                        margin-top: 20px;
                        color: #777;
                    }
                    .footer {
                        margin-top: 20px;
                        color: #555;
                    }
                </style>
             </head>
             <body>
               <div class="email-container">
           <h1>New Shadchan Signed Up,  Verification Required</h1>
            <p>Dear Admin,</p>
            <p>
                I hope this message finds you well. We have a new Shadchan signup awaiting your verification. Please find the details below:
            </p>
            <p><strong>Name:</strong> ${extra['firstname']}</p>
            <p><strong>Email:</strong> ${extra['email']}</p>
            <p><strong>Signup Date:</strong> ${extra['date']}</p>
            <p>
              You can verify the Shadchan by accessing the admin panel here: <a href="${process.env.SHIDDUCH_URL}/app/project/shadchan" class="button">Verify shadchan</a>
            </p>
            <p>
                Thank you for your attention and cooperation.
            </p>
                </div>
             </body>
             </html>
`;
                    break;

                case NotificationTypes.VERIFICATION_MAIL:
                    subject = extra.language === 'en' ? 'Verify Your TGX App Sign-Up' : 'TGX アプリのサインアップを確認する'
                    htmlContent = extra.language === 'en' ?`
                        <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        background-color: #fff;
                                        margin: 0;
                                        padding: 0;
                                        font-family: Arial, sans-serif;
                                    }
                                    .email-container {
                                        background-color: #1D1324;
                                        width: 80%;
                                        margin: 20px auto;
                                        padding: 20px;
                                        border-radius: 10px;
                                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                    }
                                    p {
                                        color: #fff;
                                        line-height: 1.2;
                                    }
                                    a {
                                      color: #fff;
                                    }
                                    strong {
                                        color: #333;
                                    }
                                    .support-info {
                                        margin-top: 20px;
                                        color: #777;
                                    }
                                    .footer {
                                        margin-top: 20px;
                                        color: #555;
                                    }
                                    .verify-btn {
                                        text-decoration: none;
                                        background-color: #070118;
                                        color: #fff;
                                        padding: 15px 15px;
                                        border-radius: 10px;
                                    }
                                    .btn-content {
                                        text-align: center;
                                        margin: 35px 0px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="inner-text">
                                        <p>Dear ${extra?.user},</p><br />
                                        <p>Welcome to TGX, your premier destination for golf simulation experiences!</p><br />
                                        <p>Thank you for signing up for the TGX app. To complete your registration, please verify your email address by clicking the button below:</p>
                                        <div class="btn-content">
                                            <a href="${process.env.STORE_WEB_URL}/emailVerification?token=${extra?.token}" class="verify-btn">Verify Your Email</a>
                                        </div>
                                        <p>This step helps us ensure the security of your account and gives you access to our app features, including booking tee times, tracking your progress, and the latest news and articles on the TGX scene.</p><br />
                                        <p>If you did not sign up for a TGX account, please disregard this email.</p><br />
                                        <p>Thank you for joining the TGX community. We look forward to enhancing your golf experience!</p>
                                    </div>
                                    <div class="support-info">
                                        <p>Best regards,</p>
                                        <p>The TGX Team</p><br />
                                        <p><a href="http://www.tgxgolf.com" target="_blank">www.tgxgolf.com</a>
                                        <br /><a href="http://www.instagram.com/tgxgolf" target="_blank">www.instagram.com/tgxgolf</a></p>
                                    </div>
                                </div>
                            </body>
                            </html>`
                            : `<!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        background-color: #fff;
                                        margin: 0;
                                        padding: 0;
                                        font-family: Arial, sans-serif;
                                    }
                                    .email-container {
                                        background-color: #1D1324;
                                        width: 80%;
                                        margin: 20px auto;
                                        padding: 20px;
                                        border-radius: 10px;
                                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                    }
                                    p {
                                        color: #fff;
                                        line-height: 1.2;
                                    }
                                    a {
                                      color: #fff;
                                    }
                                    strong {
                                        color: #333;
                                    }
                                    .support-info {
                                        margin-top: 20px;
                                        color: #777;
                                    }
                                    .footer {
                                        margin-top: 20px;
                                        color: #555;
                                    }
                                    .verify-btn {
                                        text-decoration: none;
                                        background-color: #070118;
                                        color: #fff;
                                        padding: 15px 15px;
                                        border-radius: 10px;
                                    }
                                    .btn-content {
                                        text-align: center;
                                        margin: 35px 0px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="inner-text">
                                        <p>親愛なる ${extra?.user},</p><br />
                                        <p>最もリアルなシミュレーションゴルフ、TGXへようこそ！</p><br />
                                        <p>TGXアプリにご登録いただき、ありがとうございます。登録を完了するために、以下のボタンをクリックしてメールアドレスを認証してください。</p>
                                        <div class="btn-content">
                                            <a href="${process.env.STORE_WEB_URL}/emailVerification?token=${extra?.token}" class="verify-btn">メールアドレスを認証する</a>
                                        </div>
                                        <p>このステップにより、お客様のアカウントセキュリティを確保し、ティータイムの予約、進捗の記録、そしてTGXの最新ニュースや記事など、TGXアプリの様々な機能にアクセスできるようになります。</p><br />
                                        <p>もしTGXアカウントの登録に心当たりがない場合は、このメールを無視してください。</p><br />
                                        <p>TGXコミュニティにご参加いただき、ありがとうございます。皆様が最上のインドアゴルフ空間を体感いただけることを楽しみにしています！</p>
                                    </div>
                                    <div class="support-info">
                                        <p>よろしくお願いいたします。</p>
                                        <p>TGXチーム</p><br />
                                        <p><a href="http://www.tgxgolf.com" target="_blank">www.tgxgolf.com</a>
                                        <br /><a href="http://www.instagram.com/tgxgolf" target="_blank">www.instagram.com/tgxgolf</a></p>
                                    </div>
                                </div>
                            </body>
                            </html>`
                    break;

                default:
                    throw new AppError(
                        RES_TYPES.INVALID_NOTIFICATION_TYPE,
                        ERRORTYPES.INVALID_REQUEST,
                    );
            }
            const mailOptions = {
                from: process.env.FROM_EMAIL,
                to: emails,
                subject,
                html: htmlContent,
            };

            await transporter.sendMail(mailOptions);
            logger.info(`Email sent successfully to ${emails}`);
        } catch (err) {
            logger.error(`Error sending email: ${err}`);
        }
    }
}
