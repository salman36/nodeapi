import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import UserModel from "../Models/User.js";

export const isAuthenticateUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    return next(new ErrorHandler(), "please login first", 401);
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decodedData);
  req.user = await UserModel.findById(decodedData.id);
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(roles.includes(req.user.role));
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role:${req.user.role} is not allowed to access the data`,
          403
        )
      );
    }
    next();
  };
};
