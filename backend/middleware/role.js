function authorize(...allowedRoles) {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Accès interdit' });
      }
      next();
    };
  }
  
  module.exports = authorize;
  