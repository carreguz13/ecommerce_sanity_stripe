import React from "react";
import { urlFor } from "@/lib/client";
import Link from "next/link";

function FooterBanner({ footerBanner }) {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{footerBanner.discount}</p>
          <h3>{footerBanner.largeText3}</h3>
          <h3>{footerBanner.largeText2}</h3>
          <p>{footerBanner.saleTime}</p>
        </div>
        <div className="right">
          <p>{footerBanner.smallText}</p>
          <h3>{footerBanner.midText}</h3>
          <p>{footerBanner.desc2}</p>
          <Link href={`/product/headphones_new`}>
            <button type="button">{footerBanner.buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(footerBanner.image)} className="footer-banner-image" />
      </div>
    </div>
  );
}

export default FooterBanner;
