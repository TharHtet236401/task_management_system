import { fError, fMsg } from "../utils/libby.js";
import User from "../models/user.model.js";
export const categories = ["work", "personal", "home", "study", "finance", "health", "social", "travel", "projects", "errands"]

export const getCategories = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const allCategories = [...categories, ...user.newCategoriesCreated];
    fMsg(res, "Categories fetched successfully", allCategories, 200);
  } catch (error) {
    fError(res, "Internal server error", 500);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const user = await User.findById(req.user);
    if (!category) {
      return fError(res, "Category is required", 400);
    }
    if(typeof category !== "string") {
      return fError(res, "Category must be a string", 400);
    }

    if(user.newCategoriesCreated.includes(category)) {
      return fError(res, "Category already exists", 400);
    }

    if(user.newCategoriesCreated.length >= 10) {
      return fError(res, "You have reached the maximum number of categories", 400);
    }

    if(category.length > 20) {
      return fError(res, "Category must be less than 20 characters", 400);
    }
    const lowerCaseCategory = category.toLowerCase();

    user.newCategoriesCreated.push(lowerCaseCategory);
    await user.save();
    fMsg(res, "Category created successfully", category, 200);
  } catch (error) {
    fError(res, "Internal server error", 500);
  }
};

