import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";

import { api } from "@services/api";

import { storageUserSave, storageUserGet } from "@storage/StorageUser"


export type AuthContextDataProps ={
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps){
  const [ user, setUser ] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string){
    try {
      const { data } = await api.post('/sessions', { email, password})
      if ( data.user){
       setUser(data.user)
       storageUserSave(data.user)
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData(){
    const userLogged = await  storageUserGet();
    if (userLogged){
      setUser(userLogged)
    }
  }

  useEffect(()=> {
    loadUserData();
  },[])

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}