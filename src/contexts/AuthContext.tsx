import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";

import { api } from "@services/api";

import { storageAuthTokenSave, storageAuthTokenGet} from "@storage/storageAuthToken"
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser"


export type AuthContextDataProps ={
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingStorageData: boolean ;
}

type AuthContextProviderProps = {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps){
  const [ user, setUser ] = useState<UserDTO>({} as UserDTO);
  const [ isLoadingStorageData, setIsLoadingStorageData] = useState(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string){
    try {
      

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(userData);
      
    } catch (error) {
      throw error;
    }
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingStorageData(true);

      await storageUserSave(userData );
      await storageAuthTokenSave(token);
      
    } catch (error) {
      throw error;
    }finally{
      setIsLoadingStorageData(false);
    }
  }

  async function signIn(email: string, password: string){
    try {
      const { data } = await api.post('/sessions', { email, password})
      if ( data.user && data.token){
        setIsLoadingStorageData(true);
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function signOut(){
    try {
      setIsLoadingStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();

    } catch (error) {
      throw error;

    }finally{
      setIsLoadingStorageData(false);
    }
  }

  async function loadUserData(){
    try {
      setIsLoadingStorageData(true);

      const userLogged = await  storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged){
        userAndTokenUpdate(userLogged, token)
      }   
    } catch (error) {
      throw error;
    } finally{
      setIsLoadingStorageData(false);
    }
  }

  useEffect(()=> {
    loadUserData();
  },[])

  return (
    <AuthContext.Provider value={{ 
        user, 
        isLoadingStorageData, 
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}