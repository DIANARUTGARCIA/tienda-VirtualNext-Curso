//Pagina que muestra los detalles del producto en especifico
import { CartContext } from '../../context'
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'

// import { useRouter } from 'next/router'
import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { dbProducts } from '../../database'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter()
  const { addProductToCart } = useContext(CartContext)
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    description: product.description,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 5,
  })
  const [counter, setCounter] = useState(1)
  const selectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }))
  }
  const onUpdatedQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) return
    addProductToCart(tempCartProduct)
    router.push('/cart')
  }
  //   const router = useRouter();
  //   const {products:product,isLoading} = useProducts(`/products/${router.query.slug}`)
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}{' '}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}{' '}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2" component="h2">
              Cantidad
            </Typography>
            <ItemCounter
              currentValue={tempCartProduct.quantity}
              maxValue={product.inStock > 10 ? 10 : product.inStock}
              updatedQuantity={onUpdatedQuantity}
            />
            <SizeSelector
              selectedSize={tempCartProduct.size}
              sizes={product.sizes}
              onSelectedSize={(size) => selectedSize(size)}
            />
          </Box>
          {product.inStock > 0 ? (
            <Button
              color="secondary"
              className="circular-btn"
              onClick={onAddProduct}
            >
              {tempCartProduct.size
                ? 'Agregar al carrito'
                : 'Seleccione una talla'}
            </Button>
          ) : (
            <Chip label="No hay disponible" color="error" variant="outlined" />
          )}

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2">Descripción</Typography>
            <Typography variant="body2">{product.description} </Typography>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

//getserverProps o algo asi :v no se hara de esta forma ,pero queda como ejemplo de otra forma
//Estamos del lado del servidor por este lado
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string }
//   const product = await dbProducts.getProductBySlug(slug)

//   if (!slug) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {
//       product,
//     },
//   }
// }

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlug()
  const products: string[] = productSlugs.map((product) => product.slug)
  return {
    paths: products.map((slug) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if (!slug) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      product,
    },
    revalidate: 86400, //se va revalidar cada 24 horas la pagina
  }
}

export default ProductPage
