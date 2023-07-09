// const { AuthenticationError } = require('apollo-server-express');
// const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('workout');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('workout');
    }}
};

module.exports = resolvers;
