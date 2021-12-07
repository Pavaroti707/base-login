import User from "../models/user.model";
import _, { join } from "lodash";
import errorHandler from "../helpers/dbErrorHandler";
import chacedUser from "../../../cache";

const create = (req, res, next) => {
  const user = new User(req.body);

  user.save((err, result) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    res.status(200).json({ message: "Successfully signed up!" });
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    res.json(users);
  }).select("userName email");
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not fount" });
    }
    req.profile = user;
    next();
  });
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.status(200).json(req.profile);
};

const getCachedUser = (req, res) => {
  res.status(200).json(chacedUser);
};

export default { create, list, userByID, read, getCachedUser };
