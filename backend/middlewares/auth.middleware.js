import jwt from "jsonwebtoken";

export const checkAuthenticated = (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) {
      return res.status(401).json({
        success: false,
        message: "JWT token Required",
      });
    }

    try {
      const decodedToken = jwt.verify(authHeaders, process.env.JWT_SECRET_KEY);
      req.userInfo = decodedToken;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        messaage: "JWT token expired or invalid/wrong token",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
