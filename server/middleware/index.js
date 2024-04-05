//MiddleWare Function
const jwt = require("jsonwebtoken");

 const authenticateUser = async (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (authHeader === undefined) {
    res.status(400).send({
      success: false,
      message: "Invalid JWT Token",
    });
  } else {
    jwt.verify(jwtToken, "my_secret_key", async (error, payload) => {
      if (error) {
        res.status(400).send({
          success: false,
          message: "Invalid JWT Token",
        });
      }
    });
    next();
  }
};
module.exports = authenticateUser