import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/shoppingcart.css";

function ShoppingCart({ cartItems, setCartItems }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("//localhost:7080/cart", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCartItems(response.data.in_user_carts);
      })
      .catch((error) => {});
  }, [setCartItems]);

  const handleCheckout = () => {
    if (agreedToTerms) {
      // Call API to process order and navigate to confirmation page
      axios
        .post(
          "//localhost:7080/cart/checkout",
          {
            ts: "Y",
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(() => {
          navigate("/confirmation");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please agree to the terms of service before checking out.");
    }
  };

  const handleAgreedToTerms = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  const handleRemoveItem = (itemId) => {
    axios
      .delete(`//localhost:7080/cart/item/${itemId}`, {
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
      <div className="shopping-cart__terms">
        <label>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={handleAgreedToTerms}
          />
          I agree to the terms of service.
        </label>
      </div>
      <button
        className="shopping-cart__checkout-button"
        onClick={handleCheckout}
        disabled={!agreedToTerms}
      >
        Checkout
      </button>
    </div>
  );
}

export default ShoppingCart;
