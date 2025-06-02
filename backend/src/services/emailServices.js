const { createTransporter, config } = require('../config/config');

const createEmailHtml = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mensaje de Contacto</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #007bff;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 0 0 5px 5px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>¡Hola ${name}!</h1>
      </div>
      <div class="content">
        <p>
            ¡Gracias por registrarte en TaskAPI!<br>
            Tu cuenta ha sido creada con éxito y ya puedes acceder a todos nuestros servicios.<br><br>
            Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos.<br><br>
            ¡Nos alegra tenerte con nosotros!<br><br>
            Saludos,<br>
            El equipo de TaskAPI<br>
        </p>
        
      </div>
      <div class="footer">
        <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        <p>&copy; ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
      </div>
    </body>
    </html>
  `;
};

const sendEmail = async (data) => {
  const { username } = data;
  const transporter = createTransporter();
  
  const mailOptions = {
    from: config.EMAIL_USER,
    to: username,
    subject: `Asunto: 🎉 ¡Bienvenido/a a TaskAPI!`,
    html: createEmailHtml(username),
    text: `Hola ${username},\n¡Gracias por registrarte en TaskAPI!\nTu cuenta ha sido creada con éxito y ya puedes acceder a todos nuestros servicios.\n\nSi tienes alguna duda o necesitas ayuda, no dudes en contactarnos.\n\n¡Nos alegra tenerte con nosotros!\n\nSaludos,\nEl equipo de TaskAPI\n`,
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent succesfully' };
  } catch (error) {
    console.log('[ERROR] Error sending email:', error);
    return { success: false, error: 'Error sending email' };
  }
};

module.exports = {
  sendEmail
}; 