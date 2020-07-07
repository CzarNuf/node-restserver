const jwt = require('jsonwebtoken');

// ================
// Verify Token
// ================
let verifyToken = (req, res, next) => {
  let token = req.get('Authorization');
  token = !!token ? token.replace('Bearer ', '') : '';

  jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: err.message
        }
      });
    }

    req.user = decoded.user;
    next();
  });
};

// ================
// Verify Admin Role
// ================
let verifyAdminRole = (req, res, next) => {
  let user = req.user;

  if (user.role !== 'ADMIN_ROLE') {
    return res.json({
      ok: false,
      err: {
        message: 'Admin role is required'
      }
    });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdminRole
}