const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeaders = req.headers.Authorization || req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const encodedPayload = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = encodedPayload;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

const verifyIsAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "access denied,(only admin)" });
    }
  });
};
const verifyIsUserToUpdateData = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id==req.params.id) {
      next();
    } else {
      return res.status(403).json({ message: "access denied,(only user)" });
    }
  });
};
const verifyIsUserAndAdminToDelete = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id===req.params.id ||req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "access denied,(only user And Admin)" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyIsAdmin,
  verifyIsUserToUpdateData,
  verifyIsUserAndAdminToDelete,
};
