import gql from "graphql-tag";

export const typeDefs = gql`
  type Course {
    id: ID!
    courseName: String!
    code: String!
    description: String!
    createdAt: String!
    updatedAt: String!
    assignedLecturer: String
  }

  type User {
    id: ID!
    username: String!
    profession: String!
    createdAt: String!
    updatedAt: String!
    blocked: Boolean!
  }

  type Admin {
    id: ID!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    courses: [Course!]!
    users: [User!]!
    admins: [Admin!]!
  }

  type Mutation {
    createCourse(courseName: String!, code: String!, description: String!): Course!
    createUser(username: String!, password: String!, profession: String!): User!
    createAdmin(username: String!, password: String!): Admin!
    updateCourse(id: Int!, courseName: String, code: String, description: String): Course
    deleteCourse(id: Int!): Boolean!
    blockUser(id: Int!): User!
    unblockUser(id: Int!): User!
    assignLecturer(courseId: Int!, lecturerUsername: String!): Course!
  }
`;