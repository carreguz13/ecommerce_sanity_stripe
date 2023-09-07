import { urlFor } from "@/lib/client";
import React from "react";
import Link from "next/link";

//in Next.js we use the folder base routing that allow us to navigate trhout pages just by creating the file, and put the name as the route name, for example in this case we sent the link to `/product/${product.slug.current}` where product is a folder inside the folder pages, and product.slug.current means the slug of the current item beingn selected that is like the name generated automatically because of the schema we just made before, so in the route will be something like this /product/slugOfProduct begin clicked

function ProductCard({ product }) {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(product.image && product.image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
