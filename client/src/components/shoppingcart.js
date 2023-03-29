import { useState, useEffect } from "react";
import axios from "axios";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const response = axios.get("//localhost:7080/cart", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    response
      .then((response) => {
        setCartItems(response.data.in_user_carts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemoveItem = (itemId) => {
    axios
      .delete(`//localhost:7080/cart/item/${itemId}`, {
        //TODO REMOVE ITEMS FROM CART
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCartItems(response.data.in_user_carts);
      })
      .catch((error) => {});
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.brick.property.name} ({item.quantity}) - {item.brick.price}{" "}
              USD
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingCart;
