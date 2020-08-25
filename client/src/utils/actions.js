// actions - to define 3 parts of our state
    // lists of products, categories recieved from the server by Apollo to store in a global state object
        // note, the actions are listed as uppercase, but not required to be so

// list of products used by ProductList component
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
// list of categories used by CategoryList component
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
// connecting piece of the two above
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";