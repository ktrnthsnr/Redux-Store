import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

// instantiate a new global state object from createContext() function
const StoreContext = createContext();
// every Context object comes with:  a Provider and a Consumer
const { Provider } = StoreContext;


// step: custom component to instantiate our initial global state with the created useProductReducer() function
// receives these two items: 
    // 1. state     (up-to-date version of global state object) & 
    // 2. dispatch  (method that executes update of state, looks for an action object passed in as an arg)
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({       
      products: [],
      categories: [],
      currentCategory: '',
    });

    // use this to confirm it works! 
    console.log(state);

    // returns the provider component with state object and dispatch for the value prop
    return <Provider value={[state, dispatch]} {...props} />;
  };



 // create a custom React hook function using useContext() hook, used by components that need the data the StoreProvider will be providing 
  const useStoreContext = () => {
    return useContext(StoreContext);
  };

  export { StoreProvider, useStoreContext };