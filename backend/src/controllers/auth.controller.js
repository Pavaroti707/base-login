import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../config/config";
import chacedUser from "../../../cache";

const signin = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match" });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie("t", token, { expire: new Date() + 9999 });

    chacedUser._id = user._id;
    chacedUser.userName = user.userName;
    chacedUser.email = user.email;

    return res.status(200).json({
      token,
    });
  });
};

const signout = (req, res) => {
  res.clearCookie("t");

  chacedUser._id = "";
  chacedUser.userName = "";
  chacedUser.email = "";

  return res.status(200).json({ message: "Signed Out!" });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

export default { signin, signout, requireSignin };
