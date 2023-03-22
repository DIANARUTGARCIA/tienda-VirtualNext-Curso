//Componente de la pantalla del carrito de compras cuando esta vacio 
import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'

const EmptyPage = () => {
  return (
    <ShopLayout
      title={'Carrito vacio'}
      pageDescription={'No hay articulos en el carrito :('}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 220px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Su carrito vacio</Typography>
          <NextLink href="/" passHref legacyBehavior>
            <Link typography="h4" color="secondary">
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default EmptyPage
