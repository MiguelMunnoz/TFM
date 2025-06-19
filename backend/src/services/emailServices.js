const config = require('../../config');

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
        <h1>Hi ${name}!</h1>
      </div>
      <div class="content">
        <p>
            Thank you for registering with TaskAPI!<br>
            Your account has been successfully created and you can now access all our services.<br><br>
            If you have any questions or need assistance, feel free to contact us.<br><br>
            We’re glad to have you with us!<br><br>
            Best regards,<br>
            The TaskAPI Team<br>
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

const sendEmail = async (email) => {
	const transporter = config.createTransporter();
  
	const mailOptions = {
		from: config.EMAIL_USER,
		to: email,
		subject: `🎉 Welcome to TaskAPI!`,
		html: createEmailHtml(email),
		text: `Hi ${email},\nThank you for registering with TaskAPI!
          \nYour account has been successfully created and you can now access all our services.
          \n\nIf you have any questions or need assistance, feel free to contact us.
          \n\nWe’re glad to have you with us!
          \n\nBest regards,  
          \nThe TaskAPI Team\n`,
	};
  
	try {
		await transporter.sendMail(mailOptions);
		return { success: true, message: 'Email sent succesfully' };
	} catch (error) {
		console.log('[ERROR] Error sending email:', error);
		return { success: false, error: 'Error sending email' };
	}
};

module.exports = {
  sendEmail
}; 