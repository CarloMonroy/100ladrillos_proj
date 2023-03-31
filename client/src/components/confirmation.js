import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/confirmation.css";

function ConfirmationPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("//localhost:7080/cart/final_cart", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setCartItems(response.data);
      });
  }, []);

  function handleCheckout() {
    // Navigate to the checkout page
    navigate("/checkout");
  }

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">Confirmation</h1>
      <p className="confirmation-message">Thank you for your order!</p>
      <p className="confirmation-subtitle">Here is a summary of your order:</p>
      <ul className="confirmation-list">
        {cartItems.map((item) => (
          <li key={item.brick_id}>
            {item.brick.property.name} x {item.quantity}
          </li>
        ))}
      </ul>
      <p className="confirmation-time-limit">
        Recuerda que solo tienes 3 minutos para completar tu orden o los
        ladrillos se liberarán para otros usuarios.
      </p>
      <button className="confirmation-checkout" onClick={handleCheckout}>
        COMPRAR
      </button>
    </div>
  );
}

export default ConfirmationPage;
