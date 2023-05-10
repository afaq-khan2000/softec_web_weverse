const authorize =
  (...roles) =>
  (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };

module.exports = authorize;
