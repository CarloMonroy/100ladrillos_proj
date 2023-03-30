import { useState, useEffect } from "react";
import axios from "axios";
import "../css/shoppingcart.css";

function ShoppingCart({ cartItems = [], setCartItems }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    <div className="shopping-cart">
      <h2 className="shopping-cart__title">Shopping Cart</h2>
      <button
        className="shopping-cart__toggle-button"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        {isCartOpen ? "Hide Cart" : "Show Cart"}
      </button>
      {isCartOpen && (
        <ul className="shopping-cart__list">
          {cartItems.length === 0 ? (
            <p className="shopping-cart__empty-message">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <li className="shopping-cart__item" key={item.id}>
                <div className="shopping-cart__item-info">
                  <p className="shopping-cart__item-name">
                    {item.brick.property.name} ({item.quantity})
                  </p>
                  <p className="shopping-cart__item-price">
                    {item.brick.price} USD
                  </p>
                </div>
                <button
                  className="shopping-cart__remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default ShoppingCart;
