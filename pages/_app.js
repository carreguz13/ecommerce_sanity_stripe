import React from 'react'
import "../styles/globals.css"
//we import here the layout component and wrap the component tag down 
import { Layout } from '@/components'
import { StateContext } from '@/context/StateContext'
import { Toaster } from 'react-hot-toast'

function App({Component, pageProps}) {
  return (
    <StateContext>
    <Layout>
    {/**the toaster goes on top of component as a self cloding component  */}
    <Toaster/>
        <Component {...pageProps} />
    </Layout>
    </StateContext>
  )
}

export default App