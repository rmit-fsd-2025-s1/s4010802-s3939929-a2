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
          profession
          blocked
          createdAt
          updatedAt
        }
      }
    `,
    fetchPolicy: "no-cache" 
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
          createdAt
          updatedAt
          blocked
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

export const createCourse = async (course: {
  courseName: string;
  code: string;
  description: string;
}) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation ($courseName: String!, $code: String!, $description: String!) {
        createCourse(
          courseName: $courseName
          code: $code
          description: $description
        ) {
          id
        }
      }
    `,
    variables: course,
  });
  return data.createCourse;
};

export const updateCourse = async (
  id: number,
  updatedData: { courseName: string; code: string; description: string }
) => {
  const response = await client.mutate({
    mutation: gql`
      mutation UpdateCourse($id: Int!, $courseName: String, $code: String, $description: String) {
        updateCourse(id: $id, courseName: $courseName, code: $code, description: $description) {
          id
          courseName
          code
          description
        }
      }
    `,
    variables: {
      id,
      ...updatedData,
    },
  });

  return response.data.updateCourse;
};

export const deleteCourse = async (id: number) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation DeleteCourse($id: Int!) {
        deleteCourse(id: $id)
      }
    `,
    variables: { id },
  });
  return data.deleteCourse;
};

export const blockUser = async (id: number) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation BlockUser($id: Int!) {
        blockUser(id: $id) {
          id
          username
          profession
          blocked
          createdAt
          updatedAt
        }
      }
    `,
    variables: { id },
  });
  return data.blockUser;
};

export const unblockUser = async (id: number) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation UnblockUser($id: Int!) {
        unblockUser(id: $id) {
          id
          username
          profession
          blocked
          createdAt
          updatedAt
        }
      }
    `,
    variables: { id },
  });
  return data.unblockUser;
};
