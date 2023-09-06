import React from "react";
//By using the <Head> component from "next/head," you're properly updating the document's head on both the server and the client
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
//this children is the component from the _app.js who has the whole page of the index.js file that is the home page, thats why we put it in the main, so it can appears there with the head and footer
function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        .22+
        <title>Ecommerce Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
