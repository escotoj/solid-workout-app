// resolvers is for the query
const { AuthenticationError } = require("apollo-server-express");
const { User, Workout } = require("../models/index");
const { signToken } = require("../utils/auth");

const updateWorkoutAuthors = async (oldUsername, newUsername) => {
  await Workout.updateMany({ workoutAuthor: oldUsername }, { $set: { workoutAuthor: newUsername } });
};


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('workouts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // users: async () => {
    //   return User.find().populate('workouts');
    // },

    // singleUser: async (parent, { userId }) => {
    //   return User.findOne({ _id: userId }).populate('workouts');;
    // },

    // workouts: async () => {
    //   return Workout.find();
    // },

    singleWorkout: async (parent, { workoutId }) => {
      console.log("hit singleWorkout", workoutId)
      return Workout.findOne({ _id: workoutId });
    },
  },
  Mutation: {
    login: async (root, { email, password }) => {
      console.log("LOGIN_USER");
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (root, { username, email, password }) => {
      console.log("ADD_USER");
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    addWorkout: async (root, { details, title, date, notes, workoutAuthor }, context) => {
      try {
        console.log("CREATE_workout");
      if (context.user){
        const workoutData = { details, title, date, notes, workoutAuthor };

        const workout = await Workout.create(workoutData);
        const workoutObj = workout.toObject();
        await User.findOneAndUpdate(
          { _id: context.user._id},
          { $addToSet: { workouts: workoutObj._id } }
        );
        console.log(User);

        return workoutObj;
      }
        
      } catch (error) {
        throw new Error(error)
      }
    },

    // Mutation to remove a workout
  removeWorkout: async (root, { workoutId }, context) => {
  console.log("DELETE");
  if (context.user) {
    // Attempt to delete the workout
    const deletedWorkout = await Workout.findOneAndDelete({ _id: workoutId });

    // Check if the workout was successfully deleted
    if (!deletedWorkout) {
      throw new Error("workout not found or already deleted.");
    }

    // Find the user and update their workouts
    const user = await User.findById(context.user._id);
    if (!user) {
      throw new Error("User not found.");
    }

    return await User.findOneAndUpdate(
      { _id: context.user._id},
      { $pull: { workouts: workoutId }},
      { new: true, runValidators: true }
    );
  }
  else throw new AuthenticationError("No user context");
},
  
  updateUser: async (root, { username, email, password }, context) => {
      console.log("UPDATE_USER");
      if (context.user) {
        
          // Get the old username before updating the user
          const oldUsername = context.user.username;

          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { username, email, password },
            { new: true, runValidators: true }
          );

          // Check if the username has changed
          if (username !== oldUsername) {
             // Update the workoutAuthor in all workouts with the old username to the new username
             await updateWorkoutAuthors(oldUsername, username);
            };
        return updatedUser;
       } else {
         throw new AuthenticationError("You can only update your own user details!");
       
     }
    },

    // Mutation to update a workout's details

    updateWorkout: async (root, { workoutId, details, title, date, notes }, context) => {
      console.log("UPDATE_WORKOUT");

      if (context.user) {
        const updatedWorkout = await Workout.findByIdAndUpdate(
          { _id: workoutId },
          { details, title, date },
          { new: true, runValidators: true }
        );
        await User.findOneAndUpdate(
          { _id: context.user._id  },
          { $addToSet: { workouts: updatedWorkout._id } }
        );
        return updatedWorkout;
      }
      else throw new AuthenticationError("No user context");
    },
  },

};



module.exports = resolvers;

