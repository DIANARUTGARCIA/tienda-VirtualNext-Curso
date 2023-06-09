import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { FullScreenLoading } from '../components/ui'
import { useProducts } from '../hooks'

const Home: NextPage = () => {
  const { products, isLoading } = useProducts('/products')
  return (
    <ShopLayout
      title={'Tesla-shop Home'}
      pageDescription={'Precios para todos'}
    >
      <Typography variant="h1" component="h1">
        Tienda Online
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading/> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default Home
