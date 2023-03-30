import React, { useState, useEffect } from "react";
import Properties from "./properties";
import axios from "axios";
import "../css/propertiesparent.css";
const querystring = require("querystring");
function PropertyParent({ onAddToCart, setCartItems, cartItems }) {
  const [properties, setProperties] = useState([]);

  //   useEffect(() => {
  //     fetch("/api/properties")
  //       .then((response) => response.json())
  //       .then((data) => setProperties(data.properties));
  //  }, []);A

  useEffect(() => {
    axios
      .get("//localhost:7080/property/all", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => response.data.rows)
      .then((data) => setProperties(data));
  }, []);

  return (
    <div className="property-parent">
      <div className="property-parent__header">
        <h1 className="property-parent__title">Properties</h1>
        <div className="property-parent__cart">
          <i className="fas fa-shopping-cart property-parent__cart-icon"></i>
          <span className="property-parent__cart-count">
            {cartItems.length}
          </span>
        </div>
      </div>
      <Properties properties={properties} onAddToCart={onAddToCart} />
    </div>
  );
}

export default PropertyParent;
