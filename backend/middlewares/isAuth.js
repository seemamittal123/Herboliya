import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "token is not found" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodeToken) {
      return res.status(401).json({ message: "token is not verify" });
    }
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAuth;
