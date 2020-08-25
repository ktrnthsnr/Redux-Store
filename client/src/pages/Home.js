// The Home page component keeps track of the current category we are viewing.

// -- removed "use" state management and add "global" state management instead
import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

// -- after global state
const Home = () => {
    return (
      <div className="container">
        <CategoryMenu />
        <ProductList />
      </div>
    );  
};

export default Home;

// -- before global state
    //  const Home = () => {
    //    const [currentCategory, setCategory] = useState("");
      //   return (
      //     <div className="container">
      //       <CategoryMenu setCategory={setCategory} />
      //       <ProductList currentCategory={currentCategory} />
      //     </div>
      //   );
     // };


