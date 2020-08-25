//  adding reducer, intially, to test our action function in src/__tests__/reducers.test.js

// react hook to test creating the global state object and create funcationality to use the reducer() function
import { useReducer } from 'react';

// prep: import the actions
 import {
        UPDATE_PRODUCTS,
        UPDATE_CATEGORIES,
        UPDATE_CURRENT_CATEGORY
    } from "./actions";
    
        //   // 1. tesitng the products array
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

        // if it's none of these actions, do not update state at all and keep things the same!
        default:
            return state;
        }
      };
    

// initialize global state object
export function useProductReducer(initialState) {
        return useReducer(reducer, initialState);
}
     
