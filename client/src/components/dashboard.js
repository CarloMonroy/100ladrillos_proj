import { React, useState } from "react";
import ShoppingCart from "./shoppingcart";
import PropertiesParent from "./propertiesParent";
import axios from "axios";
const DashboardPage = () => {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(brickId) {
    // Make a post request to the API to add the selected brick to the cart
    axios
      .post(
        "//localhost:7080/cart",
        {
          brick_id: brickId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => setCartItems(response.data.in_user_carts));
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />
      <PropertiesParent
        onAddToCart={handleAddToCart}
        setCartItems={setCartItems}
        cartItems={cartItems}
      />
    </div>
  );
};

export default DashboardPage;
