import React, { useState, useEffect } from "react";
import Properties from "./properties";
import axios from "axios";
const querystring = require("querystring");
function PropertyParent() {
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
    <div>
      <h1>Properties</h1>
      <Properties properties={properties} />
    </div>
  );
}

export default PropertyParent;
