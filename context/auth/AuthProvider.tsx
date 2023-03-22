import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, useEffect, useReducer } from 'react'
import { useSession,signOut } from 'next-auth/react'
import { tesloApi } from '../../api'
import { IUser } from '../../interfaces'
import { AuthContext, authReducer } from './'

export interface AuthState {
  isLoggeIn: boolean
  user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggeIn: false,
  user: undefined,
}

interface Props {
  children?: React.ReactNode | undefined
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
  const { data,status} = useSession();
  const router = useRouter();

  useEffect(() => {
   if (status === 'authenticated'){
    console.log(data.user)
    dispatch({type: 'Auth - Login',payload: data?.user as IUser})
   }
  }, [status,data])
  

  // useEffect(() => {
  //   checToken()
  // }, [])

  const checToken = async () => {
    if(!Cookies.get('token')){
      return;
    }
    try {
      const { data } = await tesloApi.get('/user/validate-token')
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - Login', payload: user })
    } catch (error) {
      Cookies.remove('token')
    }
  }

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - Login', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', {
        name,
        email,
        password,
      })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - Login', payload: user })

      return {
        hasError: false,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        }
      }
      return {
        hasError: true,
        message: 'No se puede crear el usuario',
      }
    }
  }
  const logout = ()=>{
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');
       signOut();
   
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        //Metodos
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
