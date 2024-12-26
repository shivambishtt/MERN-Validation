import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";


const generateAccessTokenAndRefreshToken = async (userId)=>{
  try {
    const user = await User.findById(userId)
  
    const accessToken= await user.generateAccessToken()
    const refreshToken= await user.generateRefreshToken()
  
    user.refreshToken= refreshToken
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}
  
  } catch (error) {
      throw new apiError("Error occured while generating the access and refresh token",400)
  }


}

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !email || !password || !username)
    throw new apiError("All fields are required", 401);

  const userExists = await User.findOne({ email });
  if (userExists) {
    new apiError("User with this email is already registered", 401);
  }

  const user = await User.create({
    fullName,
    username,
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

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new apiError("Email and password is required", 401);
  }

  const user = await User.findOne({email});

  if (!user) {
    throw new apiError("No such user exists !! try to register the user first",404);
}

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError("Invalid user credentials", 401);
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);  

    const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
  .status(200)
  .cookie("accessToken", accessToken)
  .cookie("refreshToken", refreshToken)
    .json(
      new apiResponse("User successfully logged in",
        {user:loggedInUser,accessToken,refreshToken}));
});
