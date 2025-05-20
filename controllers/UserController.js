import User from "../models/UserModal.js";
import { STATUS_CODE, MESSAGE } from "../config/constants.js";

// Create User
export const createUser = async (req, res) => {
  console.log("Incoming create request");
  const { firstName, lastName, email, group } = req.body;

  // Validation for required fields
  if (!firstName || !lastName || !email || !group) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      message: MESSAGE.ALL_FIELDS_REQUIRED,
    });
  }

  console.log("Request body:", req.body);

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(STATUS_CODE.CONFLICT).json({
        message: MESSAGE.EMAIL_ALREADY_EXISTS,
      });
    }

    // Create and save new user
    const newUser = new User({ firstName, lastName, email, group });
    console.log("New user object:", newUser);

    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);

    return res.status(STATUS_CODE.CREATED).json(savedUser);
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

//get user
export const getUsers = async (req, res) => {
  try {
    const filters = {};

    const search = req.query.search;
    const group = req.query.group;

    if (group) {
      filters.group = group;
    }

    if (search) {
      // Use $or to search across multiple fields with regex:
      filters.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ];
    }

    const users = await User.find(filters);
    return res.status(STATUS_CODE.OK).json(users);
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};


// Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, group } = req.body;

  try {
    // Check if the email already exists for another user
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser._id.toString() !== id) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Proceed to update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, group },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        message: MESSAGE.USER_NOT_FOUND,
      });
    }

    return res.status(STATUS_CODE.OK).json({
      message: MESSAGE.USER_DELETED_SUCCESSFULLY,
    });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
