import gql from "graphql-tag";

export const typeDefs = gql`
    type Admin {
        id: ID!
        username: String!
        createdAt: String!
        updatedAt: String!
    }

    type Course {
        id: ID!
        courseName: String!
        code: String!
        description: String!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        id: ID!
        username: String!
        role: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        admins: [Admin!]!
        courses: [Course!]!
        users: [User!]!
    }

    type Mutation {
        createAdmin(username: String!, password: String!): Admin!
        createCourse(courseName: String!, code: String!, description: String!): Course!
        createUser(username: String!, password: String!, role: String!): User!
    }
`;