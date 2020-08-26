import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"

// adding global state to replace props, to add items to cart
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

function ProductItem(item) {

  // adding state and toggle
  const [state, dispatch] = useStoreContext();

  const addToCart = () => {
    dispatch({
      type: ADD_TO_CART,
      product: { ...item, purchaseQuantity: 1 }
    });
  };

  console.log(state);

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      {/* <button>Add to cart</button> */}
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
