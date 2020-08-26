import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

// indexedDB
import { idbPromise } from "../utils/helpers";

// implementing global state, action and context Hook
import { useStoreContext } from "../utils/GlobalState";
// import { UPDATE_PRODUCTS } from "../utils/actions";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';

// shopping cart
import Cart from '../components/Cart';

// -- querying data from Apollo then destructuring the products with state
function Detail() {
    // -- before adding global state
      // const products = data?.products || [];

    // after adding global state
    const [ state, dispatch ] = useStoreContext();
    const { id } = useParams();
    const [ currentProduct, setCurrentProduct ] = useState({})
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    // const { products } = state;
    const { products, cart } = state;
      
    // -- add to cart, after adding indexedDB
    const addToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem._id === id)
    
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
        // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          product: { ...currentProduct, purchaseQuantity: 1 }
        });
        // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
        idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
      }
    }

    // -- previous, add to cart
          // const addToCart = () => {
          //   const itemInCart = cart.find((cartItem) => cartItem._id === id);
          
          //   if (itemInCart) {
          //     dispatch({
          //       type: UPDATE_CART_QUANTITY,
          //       _id: id,
          //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
          //     });
          //   } else {
          //     dispatch({
          //       type: ADD_TO_CART,
          //       product: { ...currentProduct, purchaseQuantity: 1 }
          //     });
          //   }
          // };

    // -- remove from cart, after indexedDB
    const removeFromCart = () => {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: currentProduct._id
      });    
      // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
      idbPromise('cart', 'delete', { ...currentProduct });
    };

    // -- previous, remove from cart
        // const removeFromCart = () => {
        //   dispatch({
        //     type: REMOVE_FROM_CART,
        //     _id: currentProduct._id
        //   });
        // };

  // -- previous, cart
        // const addToCart = () => {
        //   dispatch({
        //     type: ADD_TO_CART,
        //     product: { ...currentProduct, purchaseQuantity: 1 }
        //   });
        // };

        // useEffect(() => {
        //   if (products.length) {
        //     setCurrentProduct(products.find(product => product._id === id));
        //   } else if (data) {
        //     dispatch({
        //       type: UPDATE_PRODUCTS,
        //       products: data.products
        //     });
        //   }
        // }, [products, data, dispatch, id]);

 // -- before global state
  // useEffect(() => {
  //   if (products.length) {
  //     setCurrentProduct(products.find(product => product._id === id));
  //   }
  // }, [products, id]);

  // indexedDB
  useEffect(() => {
        // in global store
        if (products.length) {
          setCurrentProduct(products.find(product => product._id === id));
        } 
        // retrieved from the server
        else if (data) {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: data.products
          });
      
          data.products.forEach((product) => {
            idbPromise('products', 'put', product);
          });
        }
        // retrieve cache from the idb
        else if (!loading) {
          idbPromise('products', 'get').then((indexedProducts) => {
            dispatch({
              type: UPDATE_PRODUCTS,
              products: indexedProducts
            });
          });
        }
  }, [products, data, loading, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            {/* <button>Add to Cart</button> */}
            <button onClick={addToCart}>Add to cart</button>
            {/* <button>Remove from Cart</button> */}
            <button 
                disabled={!cart.find(p => p._id === currentProduct._id)} 
                onClick={removeFromCart}
              >
                Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
            
          />
          
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
          <Cart />    
    </>
  );
};

export default Detail;
