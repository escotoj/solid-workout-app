import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
  me {
    _id
    username
    email
    workouts {
  _id
  title
  date
  details
  notes
    }
  }
}
`;


export const QUERY_SINGLE_WORKOUT = gql`
  query singleWorkout($workoutId: ID!) {
    singleWorkout(workoutId: $workoutId) {
  _id
  title
  date
  details
  notes
    }
  }
`;
