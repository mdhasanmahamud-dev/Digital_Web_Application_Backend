const roleLevel = {
  user: 1,
  moderator: 2,
  admin: 3,
  "super-admin": 4,
};

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    const userLevel = roleLevel[userRole];
    const requiredLevel = roleLevel[requiredRole];

    if (!userLevel) {
      return res.status(403).json({
        message: "Invalid user role",
      });
    }

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        message: "আপনার এই কাজটি করার অনুমতি নেই"
      });
    }

    next();
  };
};

module.exports = checkRole;
