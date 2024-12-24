import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

// access token ko generate karne ka kya tareeka ho sakta hai soch shivam
const generateAccessTokenAndRefreshToken = async function (userId) {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      "Something went wrong while generating acccess token and refresh token",
      500
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    throw new apiError("All fields are required", 401);

  const userExists = await User.findOne({ email });
  if (userExists) {
    new apiError("User with this email is already registered", 401);
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(200)
    .json(new apiResponse("User successfully registered", 200, createdUser));
});
