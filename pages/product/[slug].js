import React from "react";
import { useState } from "react";
//we need client beacuse we need to fetch data in here and urlFor cause we have images
import { urlFor, client } from "@/lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Productcard from "@/components/Productcard";

function ProductDetails({ products, product }) {
  const { image, name, details, price } = product;

  const [index, setindex] = useState(0)

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={()=>setindex(i)} />
            ))}
          </div>

        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick="">
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        {/** marquee essentialy stands for scrolling parts*/}
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Productcard key={item._id} product={item} />
            ))}

           
          </div>
        </div>
      </div>
    </div>
  );
}

//getStaticPaths
//If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug {
        current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

//You should use getStaticProps ((Static Site Generation)) if:

//The data required to render the page is available at build time ahead of a user’s request

//The data comes from a headless CMS

//a benefit of using getStaticProps is that we can destructure params and outside the params we can get access to the actual url query, means we gonna get access to whatever the slug means

// this ${slug}][0]` is because we only want to fetch the first product that matches that slug or query

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  //this one to get all the products
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
