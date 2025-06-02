function authorizeRole(...roles) {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Unauthorized role' });
        }

        next();
    };
}
  
  module.exports = authorizeRole;
  