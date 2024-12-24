import User from "../models/user.model.js";
import { passwordStrength, fMsg, fError } from "../utils/libby.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    console.log(req.body);

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

    console.log(password == confirmPassword);
    if (password !== confirmPassword) {
      return fError(res, "Password and confirm password do not match", 400);
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    return fMsg(res, "User created successfully", newUser, 201);
  } catch (error) {
    return fError(res, error.message, 500);
  }
};
