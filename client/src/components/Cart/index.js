// shopping cart
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
// import global state and toggle action
import { useStoreContext } from '../../utils/GlobalState';

// -- replaced with useEffect() hook to check the items saved in the indexedDB
import React, { useEffect } from "react";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
// -- previous
// import React from 'react';
// import { TOGGLE_CART } from '../../utils/actions';

// stripe
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


const Cart = () => {

  const [state, dispatch] = useStoreContext();

  //stripe
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // indexedDB
  useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };
      
        if (!state.cart.length) {
          getCart();
        }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // stripe
  function submitCheckout() {
    const productIds = [];

    getCheckout({
      variables: { products: productIds }
    });
  
    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });
  }

  // stripe
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // display the closed shopping cart icon
  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span
          role="img"
          aria-label="trash">🛒</span>
      </div>
    );
  }

  return (

    <div className="cart">
        <div className="close" onClick={toggleCart}>[close]</div>
          <h2>Shopping Cart</h2>
          {state.cart.length ? (
            <div>
              {state.cart.map(item => (
                <CartItem key={item._id} item={item} />
              ))}
              <div className="flex-row space-between">
                <strong>Total: ${calculateTotal()}</strong>
                {
                  Auth.loggedIn() ?
                    // <button>
                    //   Checkout
                    // </button>
                    <button onClick={submitCheckout}>
                    Checkout
                  </button>
                    :
                    <span>(log in to check out)</span>
                }
              </div>
            </div>
          ) : (
            <h3>
              <span role="img" aria-label="shocked">
                😱
              </span>
              You haven't added anything to your cart yet!
            </h3>
          )}
    </div>
  );
};

export default Cart;

// -- previous before global and toggle added

    // <div className="cart">
    // {/* <div className="close">[close]</div> */}
    // <div className="close" onClick={toggleCart}>[close]</div>
    // <h2>Shopping Cart</h2>
    // <div>
    //     <CartItem item={{name:'Camera', image:'camera.jpg', price:5, purchaseQuantity:3}} />
    //     <CartItem item={{name:'Soap', image:'soap.jpg', price:6, purchaseQuantity:4}} />

    //     <div className="flex-row space-between">
    //       <strong>Total: $0</strong>
    //       {
    //         Auth.loggedIn() ?
    //           <button>
    //             Checkout
    //           </button>
    //           :
    //           <span>(log in to check out)</span>
    //       }
          
    //     </div>
    //   </div>
    // </div>
    // );
    // };