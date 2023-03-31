import React from "react";
import "../css/properties.css";

function PropertiesComponent({ onAddToCart, properties }) {
  return (
    <div className="properties">
      {properties.map((property) => (
        <div className="property" key={property.id}>
          <h2 className="property__title">{property.name}</h2>
          <ul className="property__bricks">
            {property.bricks.slice(0, 5).map((brick) => (
              <li className="brick" key={brick.id}>
                <p className="brick__name">{brick.name}</p>
                <p className="brick__price">{brick.price}</p>
                <button
                  className="brick__add-to-cart"
                  onClick={() => {
                    onAddToCart(brick.id);
                  }}
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PropertiesComponent;
