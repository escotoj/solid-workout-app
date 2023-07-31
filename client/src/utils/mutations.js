import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String! $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      email
      }
    }
  }
`
export const ADD_USER = gql`
mutation addUser($email: String! $username: String! $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
    }
  }
}
`
export const UPDATE_USER = gql`
  mutation updateUser($email: String, $username: String, $password: String) {
    updateUser(email: $email, username: $username, password: $password) {
      _id
      email
      username
    }
  }
`;
export const ADD_WORKOUT = gql`
  mutation addWorkout($details: String!, $title: String!, $date: String, $notes: String) {
    addWorkout(details: $details, title: $title, date: $date, notes: $notes) {
        _id
        title
        date
        details
        notes
    }
  }
`;


export const UPDATE_WORKOUT = gql`
  mutation updateWorkout($workoutId: ID!, $details: String, $title: String, $date: String, $notes: String) {
    updateWorkout(workoutId: $workoutId, details: $details, title: $title, date: $date, notes: $notes) {
        _id
        title
        date
        details
        notes
    }
  }
`;


export const REMOVE_WORKOUT = gql`
  mutation removeWorkout($workoutId: ID!) {
    removeWorkout(workoutId: $workoutId) {
      _id
      workouts {
        _id
      }
    }
  }
`;

