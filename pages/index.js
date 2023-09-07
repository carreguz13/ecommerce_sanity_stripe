import React from 'react';
//with this we bring the conection from sanityso we can fetch data
import {client} from "../lib/client"
import {Productcard, FooterBanner, HeroBanner} from "../components"
//if bannerData has lenght then it means there is products in the schema, so if its true we can get the first element of the bannerData schema for the banner, thats why we use bannerData[0], this note is for the HeroBanner component prop down.

function Home({products, bannerData}) {
  return (
    <div>
      <>
            <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      
              <div className='products-heading'>
          <h2>Best Selling Products</h2>
          <p>Speakers of many variations</p>
        </div>
       
        <div className='products-container'>{products?.map((product) => 
        <Productcard key={product._id} product={product}/>
        )}</div>
        <FooterBanner footerBanner={bannerData && bannerData[0]}/>
      </>
    </div>
  )
}

//fecthcing data in next by using sanity and server side rendering 
////If you export a function called getServerSideProps (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.

export const getServerSideProps = async () => {
const query = '*[_type == "product"]'
const products = await client.fetch(query)

const bannerQuery = '*[_type == "banner"]'
const bannerData = await client.fetch(bannerQuery)

return {
props: {products, bannerData}
}

}


export default Home

