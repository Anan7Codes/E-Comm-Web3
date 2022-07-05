import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <>
        <Head>
            <title>E-Comm Web3 | Roughpaper Technologies</title>
            <link rel="icon" href="/ctech.png" />
        </Head>
        <div>
            <Navbar />
            {children}
        </div>
    </>
  )
}

export default Layout