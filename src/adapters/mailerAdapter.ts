import nodemailer from 'nodemailer'
import { MailService } from '../services/mailer'

export class MailerAdapter implements MailService {
  async sendRecoverPasswordEmail(
    email: string,
    temporaryPassword: string
  ): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    })
    return await transporter
      .sendMail({
        from: `ALECTRION ADMIN <${process.env.USER}>`,
        to: email,
        subject: 'Senha temporária Alectrion',
        html: `
    <html>
    <head>
      <title>Senha temporária Alectrion</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
    
        .container {
          max-width: 500px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #333333;
        }
    
        p {
          color: #666666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Senha temporária Alectrion</h1>
        <p>A sua senha temporária é: <strong>${temporaryPassword}</strong></p>
      </div>
    </body>
    </html>`
      })
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  }
}
