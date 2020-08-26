// cart item
import React from 'react';

// import global state store and possible actions
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

// indexedDB
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

    // declare functions calling only the dispatch() function
    const [, dispatch] = useStoreContext();

    // -- indexedDB
    const removeFromCart = item => {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    };

    // -- previous
        // const removeFromCart = item => {
        //   dispatch({
        //     type: REMOVE_FROM_CART,
        //     _id: item._id
        //   });
        // };

    const onChange = (e) => {

        const value = e.target.value;      
        // with indexedDB
        if (value === '0') {
          dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
          });
        
          idbPromise('cart', 'delete', { ...item });
        } else {
          dispatch({
            type: UPDATE_CART_QUANTITY,
            _id: item._id,
            purchaseQuantity: parseInt(value)
          });
        
          idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    };


      // -- previous
          //   if (value === '0') {
          //     dispatch({
          //       type: REMOVE_FROM_CART,
          //       _id: item._id
          //     });
          //   } else {
          //     dispatch({
          //       type: UPDATE_CART_QUANTITY,
          //       _id: item._id,
          //       purchaseQuantity: parseInt(value)
          //     });
            // }
      
    return (
      <div className="flex-row">
        <div>
          <img
            src={`/images/${item.image}`}
            alt=""
          />
        </div>
        <div>
          <div>{item.name}, ${item.price}</div>
          <div>
            <span>Qty:</span>
            {/* <input
              type="number"
              placeholder="1"
              value={item.purchaseQuantity}
            /> */}
            <input
              type="number"
              placeholder="1"
              value={item.purchaseQuantity}
              onChange={onChange}
            />
            {/* <span
              role="img"
              aria-label="trash"
            >
              🗑️
            </span> */}
            <span
              role="img"
              aria-label="trash"
              onClick={() => removeFromCart(item)}
            >
              🗑️
            </span>
          </div>
        </div>
      </div>
    );
}

export default CartItem;