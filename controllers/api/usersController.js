const debug = require("debug")("mern:controllers:api:usersController");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const createJWT = (user) =>
  jwt.sign({ user }, process.env.SECRET, { expiresIn: "2m" });

const create = async (req, res) => {
  debug("body: %o", req.body);
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    debug("user: %o", user);
    const token = createJWT(user);
    res.status(201).json(token);
    // res.status(201).json({user});
  } catch (error) {
    debug("error: %o", error);
    res.status(500).json({ error });
  }
};

module.exports = {
  create,
};
