const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5200;

// set up the request parameters
const params = {
   api_key: "7F525C04644343019A81D3BD83C6476C",
   search_type: "images",
};

// app.get("/", (req, res) => {
//    res.send("app working");
// });

// convert current hour to daylight (sunrise/day/evening/night)
function daytime() {
   let hour = new Date().getHours();
   let daylight = "";

   switch (true) {
      case hour > 5 && hour <= 6:
         daylight = "sunrise";
         break;
      case hour > 6 && hour <= 17:
         daylight = "day";
         break;
      case hour > 17 && hour < 19:
         daylight = "evening";
         break;
      default:
         daylight = "night";
   }

   return daylight;
}

//function to build the search parameters
function createSearchString(city, country, weatherForecast) {
   let daylight = daytime();
   return `${city}, ${country} ${weatherForecast} ${daylight}`;
}

//function to search images on google using Scale Serp API
const searchImage = async (searchString) => {
   const response = await axios.get("https://api.scaleserp.com/search", {
      params: { ...params, q: searchString },
   });

   return response.data.image_results[0];
};


// respond to fetched data from client: create searchString then pass it to the searchImage function
app.get("/getImage", async (req, res) => {
   const searchString = createSearchString(
      req.query.city,
      req.query.country,
      req.query.weatherForecast
   );

   console.log(searchString);

   const data = await searchImage(searchString);
   res.send(data);
});

app.listen(PORT, () => console.log("listening on PORT", PORT));
