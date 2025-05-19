import {client} from "./apollo-client";
import { gql } from "@apollo/client";

export const getAdmins = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        admins {
          id
          username
          createdAt
          updatedAt
        }
      }
    `,
  });
  return data.admins;
};

export const getUsers = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        users {
          id
          username
          email
          createdAt
          updatedAt
        }
      }
    `,
  });
  return data.users;
};

export const getUserById = async (id: string) => {
  const { data } = await client.query({
    query: gql`
      query {
        user(id: ${id}) {
          id
          username
          email
          createdAt
          updatedAt
        }
      }
    `,
  });
  return data.user;
};

export const getCourses = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        courses {
          id
          courseName
          code
          description
          createdAt
          updatedAt
        }
      }
    `,
  });
  return data.courses;
};

export const getCourseById = async (id: string) => {
  const { data } = await client.query({
    query: gql`
      query {
        course(id: ${id}) {
          id
          courseName
          code
          description
          createdAt
          updatedAt
        }
      }
    `,
  });
  return data.course;
};
