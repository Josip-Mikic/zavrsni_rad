import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    { expiresIn: "30d" }
  );
};

export const isAuth = (req, res, next) => {
  const autorisation = req.headers.autorisation;
  if (autorisation) {
    const token = autorisation.slice(7, autorisation.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (error, decode) => {
        if (error) {
          res.status(401).send({ message: "Invalid token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Token invalid" });
  }
};
