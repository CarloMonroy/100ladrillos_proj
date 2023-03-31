import React, { useState } from "react";
import axios from "axios";
import "../css/orderConfirmation.css";

function OrderConfirmation() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOrder = () => {
    axios
      .post(
        "//localhost:7080/cart/buy",
        {
          test: "test",
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setShowConfirmation(true);
        }
      });
  };

  return (
    <div className="order-confirmation">
      <button onClick={handleOrder}>Place Order</button>
      {showConfirmation && (
        <div className="confirmation-message">
          <h1>Thank you for your order!</h1>
          <p>Your order has been received and will be processed shortly.</p>
          <img
            src="https://media.giphy.com/media/3oz8xRF0v8VTKgDY9C/giphy.gif"
            alt="Celebration"
          />
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
