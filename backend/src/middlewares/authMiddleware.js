const jwt = require('jsonwebtoken');
const config = require('../../config');

function authenticate(req, res, next) {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({messsage: 'Token is missing or invalid'});
	}
  
  	jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
		if (err) {
			return res.status(403).json({message: 'Authentication failed'});
		}
		req.user = decoded;
		next();
	});
}

module.exports = authenticate;
