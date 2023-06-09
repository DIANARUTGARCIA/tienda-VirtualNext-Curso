import Head from 'next/head'
import { FC } from 'react'
import { Navbar, SideMenu } from '../ui'

interface Props {
  title: string
  pageDescription: string
  imageFulUrl?: string
  children?: React.ReactNode | undefined
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFulUrl,
}) => {
  return (
    <>
      <Head>
        <title>{} </title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFulUrl && <meta name="og:image" content={imageFulUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>

      <SideMenu/>
      
      <main
        style={{ margin: '80px auto', maxWidth: '1440PX', padding: '0px 30px' }}
      >
        {children}
      </main>
      <footer></footer>
    </>
  )
}
