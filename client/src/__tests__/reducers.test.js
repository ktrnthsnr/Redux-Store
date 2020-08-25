// reducer to test the functionality (not the UI component)
    // test by running in the cd client folder: npm run test
      // NOTE: update the utils/reducers.js along with adding these tests

import { reducer } from '../utils/reducers';

    // A reducer - function that updates state by returning a new state object, never altering the original state object

 // import our actions
    // import {
    //     UPDATE_PRODUCTS,
    //     UPDATE_CATEGORIES,
    //     UPDATE_CURRENT_CATEGORY
    //   } from '../utils/actions';

  // after adding the shopping cart
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
  } from '../utils/actions';

  // after adding shopping cart
  const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
    cart: [
      {
        _id: '1',
        name: 'Soup',
        purchaseQuantity: 1
      },
      {
        _id: '2',
        name: 'Bread',
        purchaseQuantity: 2
      }
    ],
    cartOpen: false
  };


  
 // create a sample of what our global state will look like
      // const initialState = {
      //   products: [],
      //   categories: [{ name: 'Food' }],
      //   currentCategory: '1',
      // };

 // 1. test UPDATE_PRODUCTS action to validate adding a product to products array
  test('UPDATE_PRODUCTS', () => {
    let newState = reducer(initialState, {
      type: UPDATE_PRODUCTS,
      products: [{}, {}]
    });
  
    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
  });

// 2. test UPDATE_CATEGORIES action to validate adding to the categories array
test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CATEGORIES,
      categories: [{}, {}]
    });
  
    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
  });

// 3. testing UPDATE_CURRENT_CATEGORY to validate interacting with the two prev arrays
 test('UPDATE_CURRENT_CATEGORY', () => {
        let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
        });

        expect(newState.currentCategory).toBe('2');
        expect(initialState.currentCategory).toBe('1');
   });

   // 4. shopping cart
   test('ADD_TO_CART', () => {
    let newState = reducer(initialState, {
      type: ADD_TO_CART,
      product: { purchaseQuantity: 1 }
    });
  
    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
  });

  // 5. shopping cart, add items
  test('ADD_MULTIPLE_TO_CART', () => {
    let newState = reducer(initialState, {
      type: ADD_MULTIPLE_TO_CART,
      products: [{}, {}]
    });
  
    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2);
  });


// 6. shopping cart, remove the cart
  test('REMOVE_FROM_CART', () => {
    let newState1 = reducer(initialState, {
      type: REMOVE_FROM_CART,
      _id: '1'
    });

    // cart is still open
    expect(newState1.cartOpen).toBe(true);

    // the second item should now be the first
    expect(newState1.cart.length).toBe(1);
    expect(newState1.cart[0]._id).toBe('2');

    let newState2 = reducer(newState1, {
      type: REMOVE_FROM_CART,
      _id: '2'
    });

    // cart is empty and closed
    expect(newState2.cartOpen).toBe(false);
    expect(newState2.cart.length).toBe(0);

    expect(initialState.cart.length).toBe(2);
  });


  // 7. shopping cart, update qty
  test('UPDATE_CART_QUANTITY', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CART_QUANTITY,
      _id: '1',
      purchaseQuantity: 3
    });
  
    expect(newState.cartOpen).toBe(true);
    expect(newState.cart[0].purchaseQuantity).toBe(3);
    expect(newState.cart[1].purchaseQuantity).toBe(2);
  
    expect(initialState.cartOpen).toBe(false);
  });

// 8. clear shopping cart
test('CLEAR_CART', () => {
  let newState = reducer(initialState, {
    type: CLEAR_CART
  });

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

//9. cart visibility toggle
test('TOGGLE_CART', () => {
  let newState = reducer(initialState, {
    type: TOGGLE_CART
  });

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);

  let newState2 = reducer(newState, {
    type: TOGGLE_CART
  });

  expect(newState2.cartOpen).toBe(false);
});