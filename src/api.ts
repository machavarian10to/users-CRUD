import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await api.post('/users', user);
  return response.data;
};  

export const updateUser = async (id: number, user: User): Promise<User> => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

