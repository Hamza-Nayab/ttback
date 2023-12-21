import User from "../models/User.js";
import jwt from "jsonwebtoken";

const UserController = {
  // Register a new user
  async register(req, res) {
    try {
      const { fullName, email, password, status } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with this email." });
      }

      let profilePicture = "";
      if (req.file) {
        profilePicture = req.file.path;
      }

      const newUser = await User.create({
        fullName,
        email,
        password,
        status,
        profilePicture,
      });
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        "secret"
      );

      return res
        .status(201)
        .json({
          message: "User registered successfully",
          user: newUser,
          token: token,
        });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  },

  async updateUserProfile(req, res) {
    try {
      const userId = req.params.userId;
      const { fullName, email } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.fullName = fullName || user.fullName;
      user.email = email || user.email;

      // Check if there's an uploaded profile picture
      if (req.file) {
        user.profilePicture = req.file.path; // Assuming you're storing the file path in your User model
      }

      await user.save();
      return res.status(200).json({ message: "User profile updated", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating user profile", error: error.message });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { location, description, phone } = req.body;
    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.location = location;
      user.description = description;
      user.phone = phone.toString();

      if (user.status === "Buyer") {
        user.status = "Seller";
      }

      await user.save();

      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ email: user.email, id: user._id }, "secret");

      console.log(token);
      return res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  },

  async getUserProfile(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching user profile", error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;

      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  },

  async getAllUsers(req, res) {
    console.log("Fetching Users ..");
    try {
      const users = await User.find();

      return res.status(200).json({ users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  },
  async getAllSellers(req, res) {
    console.log("Get Seller.... ..");
    try {
      const users = await User.find();

      return res.status(200).json({ users });
    } catch (error) {
      console.log("Error in Fetching Seller : ", error);
      return res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  },
};

export default UserController;
