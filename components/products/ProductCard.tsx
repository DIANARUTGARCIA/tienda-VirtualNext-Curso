//Compnente par la card donde se muestra la imagen ,el titulo y el precio de los prodcutos
import NextLink from 'next/link'
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  Link,
  Chip,
} from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { IProduct } from '../../interfaces'

interface Props {
  product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  //Memorizacion de la imgen para que cambie al momento de poner el cursor encima de la card
  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0]
  }, [isHovered, product.images])

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink
          href={`/product/${product.slug}`}
          prefetch={false}
          passHref
          legacyBehavior
        >
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  color="primary"
                  label="No hay disponibles"
                  sx={{
                    postion: 'absolute',
                    zIndex: 99,
                    top: '10px',
                    left: '10px',
                  }}
                />
              )}

              <CardMedia
                component="img"
                className="fadeIn"
                image={productImage}
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography fontWeight={700}> {product.title} </Typography>
        <Typography fontWeight={400}> {`$${product.price}`} </Typography>
      </Box>
    </Grid>
  )
}
