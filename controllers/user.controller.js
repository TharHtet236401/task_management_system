import User from "../models/user.model.js";
import { passwordStrength, fMsg, fError, encode, decode ,generateTokenAndSetCookie} from "../utils/libby.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return fError(res, "All fields are requireddd", 400);
    }

    // Check if user already exists first to avoid unnecessary password checks
    const user = await User.findOne({ email });
    if (user) return fError(res, "User already exists", 400);

    // Validate password
    if (!passwordStrength(password)) {
      return fError(res, "Password is not strong enough", 400);
    }

    if (password !== confirmPassword) {
      return fError(res, "Password and confirm password do not match", 400);
    }

    const hashedPassword = encode(password);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return fMsg(res, "User created successfully", newUser, 201);
  } catch (error) {
    return fError(res, error.message, 500);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return fError(res, "All fields are required", 400);

  const currentUser = await User.findOne({ email });
  if (!currentUser) return fError(res, "User not found", 400);

  const checkPassword = decode(password, currentUser.password);
  if (!checkPassword) return fError(res, "Incorrect Email or Password", 400);

  const token = generateTokenAndSetCookie(res, currentUser._id);
  return fMsg(res, "Login successful", {user:currentUser,token:token}, 200);
};


export const logout = async (req, res) => {
  res.clearCookie('jwt');
  return fMsg(res, "Logout successful", null, 200);
};


export const dummyRateLimit = async (req, res) => {
  return fMsg(res, "Dummy rate limit test", null, 200);
};
