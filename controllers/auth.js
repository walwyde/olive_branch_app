const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

exports.getIndex = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ errors: [{ msg: "user not found" }] });
    }

    res.status(200).json(user);
  } catch (err) {
    if (err) res.status("500").send([{ errors: "server error" }]);
    console.log(err.message);
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = await req.body;

    const activeUser = await User.findOne({ email });

    if (!activeUser) {
      return res.status(404).json({ errors: [{ msg: "user not found" }] });
    }

    const isMatch = await bcrypt.compare(password, activeUser.password);

    if (!isMatch) {
      return res.status(400).send({ errors: [{ msg: "password incorrect" }] });
    }

    const payload = {
      user: {
        fullname: activeUser.fullname,
        id: activeUser._id,
        isStaff: activeUser.isStaff,
        client: !activeUser.isStaff,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          console.log(err);
        }

        res.status(200).json(token);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({errors: [{error: err}]})
  }
};
