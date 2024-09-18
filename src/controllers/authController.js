const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/userModel");

const login = async (req, res) => {
  const { customerId, password } = req.body;
  let user = await UserSchema.findOne({ customerId: customerId });
  if (user == null) {
    return res.status(400).json({ status: "400", error: "User Not Found" });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(user.toObject());
      res.status(200).json({
        status: "200",
        message: "Login Successfully",
        accessToken: accessToken,
        userDetails: {
          id: user?.id,
          customerName: user.customerName,
          customerId: user.customerId,
          groupId: user.groupId,
          userRole: user.userRole,
          purchaseLimit: user.purchaseLimit,
        },
      });
    } else {
      res.status(200).json({ status: "200", message: "Wrong Password" });
    }
  } catch (err) {
    res.status(500).json({ status: "200", error: err.message });
  }
};

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ status: "401", error: "Unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err)
      return res.status(403).json({ status: "403", error: "Token Not Valid" });
    next();
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN);
};

module.exports = {
  login,
  authenticateToken,
};
