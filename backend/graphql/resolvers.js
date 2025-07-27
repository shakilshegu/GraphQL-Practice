const userController = require('../controllers/userController');

const resolvers = {
  Query: {
    users: async () => {
      return await userController.getAllUsers();
    },
    user: async (_, { id }) => {
      return await userController.getUserById(id);
    }
  },

  Mutation: {
    createUser: async (_, { input }) => {
      return await userController.createUser(input);
    },
    updateUser: async (_, { id, input }) => {
      return await userController.updateUser(id, input);
    },
    deleteUser: async (_, { id }) => {
      return await userController.deleteUser(id);
    }
  }
};

module.exports = resolvers;