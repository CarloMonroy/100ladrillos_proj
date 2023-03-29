import axios from "axios";
import { useState } from "react";
const querystring = require("querystring");

function PropertiesComponent({ properties }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(propertyId, brickId) {
    // Make a post request to the API to add the selected brick to the cart
    axios
      .post(
        "//localhost:7080/cart",
        querystring.stringify({
          bricks_id: brickId,
          quantity: 1,
        }),
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => response.json())
      .then((data) => {
        // Update the cart items state with the new cart items returned by the API
        setCartItems(data.in_user_carts);
      });
  }

  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.name}</h2>
          <ul>
            {property.bricks.slice(0, 5).map((brick) => (
              <li key={brick.id}>
                <p>{brick.name}</p>
                <p>{brick.price}</p>
                <button onClick={() => handleAddToCart(property.id, brick.id)}>
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
