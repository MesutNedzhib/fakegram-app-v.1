const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");

const {
  getAccessTokenFromHeader,
  isTokenIncluded,
} = require("../../helpers/authorization/tokenHelper");

const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;
  // 401 , 403
  // 401 - Unauthorized
  // 403 - Forbidden

  if (!isTokenIncluded(req)) {
    return next(
      new CustomError("You are not authorized to access this route", 401)
    );
  }

  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return next(
        new CustomError("You are not authorized to access this route", 401)
      );

    req.user = {
      id: decoded.id,
      name: decoded.name,
    };

    next();
  });
};

module.exports = {
  getAccessToRoute,
};
