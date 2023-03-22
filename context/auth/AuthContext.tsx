import { createContext } from 'react'
import { IUser } from '../../interfaces'

interface ContexProps {
  isLoggeIn: boolean
  user?: IUser

  //metodos o funciones

  loginUser: (email: string, password: string) => Promise<boolean>
  registerUser: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ hasError: boolean; message?: string }>
  logout:()=> void;
}

export const AuthContext = createContext({} as ContexProps)
