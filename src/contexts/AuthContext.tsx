import { UserDTO } from "@dtos/UserDTO";

import { createContext, ReactNode } from "react";

export type AuthContextDataProps ={
  user: UserDTO;
}

type AuthContextProviderProps = {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps){
  return (
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Paulo Ricardo Caldi',
        email: 'paulo@email.com',
        avatar: 'paulo.png'
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
}