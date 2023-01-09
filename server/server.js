const express = require("express");
const axios = require("axios");

const app = express();

const PORT = 5000; // not listening to this yet


// set up the request parameters
const params = {
   api_key: "7F525C04644343019A81D3BD83C6476C",
   q: "toronto rainy day",
   search_type: "images",
   location: "United States",
};

// make the http GET request to Scale SERP
axios
   .get("https://api.scaleserp.com/search", { params })
   .then((response) => {
      // print the JSON response from Scale SERP
      console.log(JSON.stringify(response.data, 0, 2));
   })
   .catch((error) => {
      // catch and print the error
      console.log(error);
   });

