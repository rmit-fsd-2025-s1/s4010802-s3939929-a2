export type Admin = {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Course = {
  id: number;
  courseName: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
