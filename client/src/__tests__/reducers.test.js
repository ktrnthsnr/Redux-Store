// reducer to test the functionality (not the UI component)
    // test by running in the client folder: npm run test

import { reducer } from '../utils/reducers';

    // A reducer - function that updates state by returning a new state object, never altering the original state object

 // import our actions
 import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
  } from '../utils/actions';
  
 // create a sample of what our global state will look like
  const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
  };

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