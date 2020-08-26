// The Home page component keeps track of the current category we are viewing.

// -- removed "use" state management and add "global" state management instead
import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
// shopping cart
import Cart from '../components/Cart';


// after shopping cart
const Home = () => {
  return (
      <div className="container">
        <CategoryMenu />
        <ProductList />
        <Cart />
      </div>
      );  
  };


export default Home;

// -- after global state
  // const Home = () => {
  //     return (
  //       <div className="container">
  //         <CategoryMenu />
  //         <ProductList />
  //       </div>
  //     );  
  // };

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


