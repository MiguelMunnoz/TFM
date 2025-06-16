const emailService = require('../services/emailServices');

const emailController = {
	sendEmail: [
		async (req, res) => {
			try {
				console.log('Recibimos info del correo: ', req.body);
				const { email } = req.body;
				const result = await emailService.sendEmail(email);
			
				if (result.success) {
					return res.status(200).json({ message: result.message });
				} else {
					return res.status(500).json({ error: result.error });
				}
			} catch (error) {
				console.log('[ERROR] Error sending email: ', error);
				return res.status(500).json({ error: '[ERROR] Error sending email' });
			}
		}
	],

	testRoute: [
		async (req, res) => {
			res.send('Email server working correctly.');
		}
	]
}


module.exports = emailController;