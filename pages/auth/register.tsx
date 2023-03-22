import NextLink from 'next/link'
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { AuthLayout } from '../../components/layouts'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { tesloApi } from '../../api'
import { validations } from '../../utils'
import { ErrorOutline } from '@mui/icons-material'
import { AuthContext } from '../../context'

import { getSession, signIn } from 'next-auth/react'


type formData = {
  name: string
  email: string
  password: string
}

const RegisterPage = () => {
  const router = useRouter()
  const { registerUser } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>()
  //Controlar el estado del error
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  //Función que trae para registrar desde la data
  const onRegisterForm = async ({ name, email, password }: formData) => {
    const { hasError, message } = await registerUser(name, email, password)

    if (hasError) {
      setShowError(true)
      setErrorMessage(message!)
      setTimeout(() => setShowError(false), 3000)

      return
    }
    await signIn('credentials',{email,password});

    // const destino = router.query.p?.toString() || '/';
    // router.replace(destino)
    ;
  }

  return (
    <AuthLayout title={'Ingresar'}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              <Chip
                label="No se puede crear el usuario"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'El nombre es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'El correo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href={router.query.page ? `/auth/login?page=${router.query.page}` : '/auth/register'} passHref legacyBehavior>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async({req,query}) =>{
  const session = await getSession({req});
  const { p = '/'} = query;

  if(session){
    return {
      redirect:{
        destination: p.toString(),
        permanent: false,
      }
    }
  }

  return {
    props:{}
   }
}

export default RegisterPage
