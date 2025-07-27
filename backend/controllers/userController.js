const User = require('../models/User');

const userController = {
  // Get all users
  getAllUsers: async () => {
    try {
      return await User.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const user = await User.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
};

module.exports = userController;