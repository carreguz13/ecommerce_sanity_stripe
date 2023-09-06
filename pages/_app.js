import React from 'react'
import "../styles/globals.css"
//we import here the layout component and wrap the component tag down 
import { Layout } from '@/components'

function App({Component, pageProps}) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}

export default App