const jwt = require('jsonwebtoken');
const SECRET_KEY = 'la-clave-ultra-super-mega-secreta';

function authenticate(req, res, next) {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({messsage: 'Token is missing or invalid'});
	}
  
  	jwt.verify(token, SECRET_KEY, (err, decoded) => {
		if (err) {
			return res.status(403).json({message: 'Authentication failed'});
		}
		req.user = decoded;
		next();
	});
}

module.exports = authenticate;
