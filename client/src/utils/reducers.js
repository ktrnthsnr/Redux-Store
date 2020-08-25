//  adding reducer, initialy, to test the action function in src/__tests__/reducers.test.js

// Testing Note: these reducer queries are jest tested under src/__tests__ /reducers.test.js.  
// Test by running from the client directory, npm run test

// react hook to test creating the global state object and create funcationality to use the reducer() function
import { useReducer } from 'react';

// prep: import the actions
        //  import {
        //         UPDATE_PRODUCTS,
        //         UPDATE_CATEGORIES,
        //         UPDATE_CURRENT_CATEGORY
        //     } from "./actions";

// after add shopping cart
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';
    
        //   // 1. testing the products array
                //   export const reducer = (state, action) => {
                //     switch (action.type) {
                //       // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
                //       case UPDATE_PRODUCTS:
                //         return {
                //           ...state,
                //           products: [...action.products],
                //         };
                
                //       // if it's none of these actions, do not update state at all and keep things the same!
                //       default:
                //         return state;
                //     }
                //   };

  
export const reducer = (state, action) => {
    switch (action.type) {

        // 1. tesitng the products array
            // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case UPDATE_PRODUCTS:
            return {
            ...state,
            products: [...action.products]
        };

            // 2. testing the category array
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
            ...state,
            categories: [...action.categories]
        };

        // 3. 
        case UPDATE_CURRENT_CATEGORY:
        return {
            ...state,
            currentCategory: action.currentCategory
        };

        // shopping cart
        case ADD_TO_CART:
        return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.product]
        };    

        case ADD_MULTIPLE_TO_CART:
        return {
            ...state,
            cart: [...state.cart, ...action.products],
        };

        case REMOVE_FROM_CART:
        let newState = state.cart.filter(product => {
            return product._id !== action._id;
        });

        return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState
        };

        // cart qty
        case UPDATE_CART_QUANTITY:
        return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(product => {
            if (action._id === product._id) {
                product.purchaseQuantity = action.purchaseQuantity;
            }
            return product;
            })
        };

        // clear the cart
        case CLEAR_CART:
        return {
            ...state,
            cartOpen: false,
            cart: []
        };

        //cart visibility toggle
        case TOGGLE_CART:
        return {
            ...state,
            cartOpen: !state.cartOpen
        };

    // if it's none of these actions, do not update state at all and keep things the same!
    default:
        return state;
    }
};



// initialize global state object
export function useProductReducer(initialState) {
        return useReducer(reducer, initialState);
}
     
