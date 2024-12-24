import apiError from "../utils/apiError.JS";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(
  async((req, _, next) => {
    try {
      const token =
        req?.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer", "");

      if (!token) {
        throw new apiError(401, "No access token found ");
      }
      // hume dekhna hai ki hum token ko decode kese karenge
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {}
  })
);
