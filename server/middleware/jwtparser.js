const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET || "secret";
function verifyDoctorToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.userId = decoded._id;
    if (decoded.type === "doctor") {
      next();
    } else {
      res.status(401).json({ error: "Invalid user type " });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
function verifyPatientToken(req, res, next) {
  console.log("Hit middleware")
  const token = req.header("Authorization");
  if (!token) {
    console.log("Hit middleware1")

    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.userId = decoded._id;
    if (decoded.type === "patient") {
      console.log("Hit middleware 2")
      next();
    } else {
      res.status(401).json({ error: "Invalid user type " });
    }
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: "Invalid token" });
  }
}

function getTokenType(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.status(200).json({ type: decoded.type });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
module.exports = { verifyDoctorToken, verifyPatientToken, getTokenType };
