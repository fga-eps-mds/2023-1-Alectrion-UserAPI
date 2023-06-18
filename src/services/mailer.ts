import nodemailer from 'nodemailer'
import crypto from 'crypto'

export const sendEmail = async (email: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  })
  const temporaryPassword = crypto.randomBytes(4).toString('hex')
  await transporter
    .sendMail({
      from: `ALECTRION ADMIN <alectriontest@gmail.com>`,
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
      console.log('EMAIL ENVIADO COM SUCESSO')
    })

  module.exports = {
    transporter
  }
}
