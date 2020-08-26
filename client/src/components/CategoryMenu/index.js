//  CategoryMenu component tracks the category list from an Apollo query

// after, implementing global state
import React, { useEffect } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

// indexedDB
import { idbPromise } from '../../utils/helpers';

// --before adding global state
// import React from "react";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";


// -- before global state
    //  function CategoryMenu({ setCategory }) {
      // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
      // const categories = categoryData?.categories || [];

// -- after global state
function CategoryMenu() { 
    const [state, dispatch] = useStoreContext();
    const { categories } = state;
    // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
    // adding indexedDB
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    // -- updated 
    useEffect(() => {
      if (categoryData) {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categoryData.categories
        });
        categoryData.categories.forEach(category => {
          idbPromise('categories', 'put', category);
        });
      } else if (!loading) {
        idbPromise('categories', 'get').then(categories => {
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: categories
          });
        });
      }
    }, [categoryData, loading, dispatch]);

    // runs immediately onload
          // useEffect(() => {

          //   // with indexedDB
          //   if (categoryData) {
          //     dispatch({
          //       type: UPDATE_CATEGORIES,
          //       categories: categoryData.categories
          //     });
          //     categoryData.categories.forEach(category => {
          //       idbPromise('categories', 'put', category);
          //     });
          //   }

      // -- if categoryData exists or has changed from the response of useQuery, then run dispatch()
        //   if (categoryData) {
        //     // -- execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
        //     dispatch({
        //       type: UPDATE_CATEGORIES,
        //       categories: categoryData.categories
        //     });
        //   }
        // }, [categoryData, dispatch]);

      // click handler to update the global state instead of using the function 
      const handleClick = id => {
        dispatch({
          type: UPDATE_CURRENT_CATEGORY,
          currentCategory: id
        });
      };

    return (
      <div>
        <h2>Choose a Category:</h2>
        {categories.map(item => (
          <button
            key={item._id}
            onClick={() => {
              handleClick(item._id);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    );
 
//   return (
//     <div>
//       <h2>Choose a Category:</h2>
//       {categories.map(item => (
//         <button
//           key={item._id}
//           onClick={() => {
//             setCategory(item._id);
//           }}
//         >
//           {item.name}
//         </button>
//       ))}
//     </div>
//   );

}

export default CategoryMenu;
