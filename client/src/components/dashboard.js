import React from "react";
import ShoppingCart from "./shoppingcart";
import PropertiesParent from "./propertiesParent";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <ShoppingCart />
      <PropertiesParent />
    </div>
  );
};

export default DashboardPage;
