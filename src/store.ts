import { create } from "zustand"
import { User, getUsers, createUser, updateUser, deleteUser } from './api.ts';

type UserStore = {
    users: User[];
    getUsers: () => Promise<void>;
    createUser: (user: User) => Promise<void>;
    updateUser: (id: number, user: User) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
};
  
export const useUserStore = create<UserStore>((set) => ({
    users: [],
    getUsers: async () => {
      const users = await getUsers();
      set({ users });
    },
    createUser: async (user: User) => {
      const newUser = await createUser(user);
      set((state) => ({
        users: [...state.users, newUser],
      }));
    },
    updateUser: async (id: number, user: User) => {
        const updatedUser = await updateUser(id, user);
        set((state) => ({
          users: state.users.map(user => (user.id === updatedUser.id ? updatedUser : user)),
        }));
      },
    deleteUser: async (id: number) => {
       await deleteUser(id);
       set((state) => ({
          users: state.users.filter((user) => user.id !== id),
       }));
    },
  }));