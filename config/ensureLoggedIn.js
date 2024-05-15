const { getUser } = require("./checkToken");
// to check if user is authenticated
module.exports = function (req, res, next) {
  const user = getUser(req, res);
  if (!user) return res.status(401).json("Unauthorized");
  next();
};
