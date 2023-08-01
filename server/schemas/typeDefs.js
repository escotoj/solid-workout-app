const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  _id: ID!
  username: String!
  email: String!
  workouts: [Workout]!
}

type Workout {
  _id: ID!
  title: String!
  date: String
  details: String!
  notes: String
  workoutAuthor: String!
}


type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  singleWorkout(workoutId: ID!): Workout
 
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addWorkout(details: String!, title: String!, date: String, notes: String): Workout
  removeWorkout(workoutId: ID!): Workout
  updateUser(username: String, email: String, password: String): User
  updateWorkout(workoutId: ID!, details: String, title: String, date: String, notes: String): Workout
}
`;

module.exports = typeDefs;