const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5200;

// set up the request parameters for scale serp api
const params = {
   api_key: "CEC342695AFD4BAE8DAA0A4AA93EEB14",
   search_type: "images",
   images_size: "large",
};

// test if app is working
app.get("/", (req, res) => {
   res.send("app working");
});

// convert current hour to daylight (sunrise/day/evening/night)
function daytime() {
   let hour = new Date().getHours();
   let daylight = "";

   switch (true) {
      case hour > 5 && hour <= 6:
         daylight = "sunrise";
         break;
      case hour > 6 && hour <= 11:
         daylight = "morning";
         break;
      case hour > 11 && hour <= 3:
         daylight = "noon";
         break;
      case hour > 3 && hour < 5:
         daylight = "afternoon";
         break;
      case hour > 5 && hour < 7:
         daylight = "evening";
         break;
      case hour > 7 && hour < 8:
         daylight = "sunset";
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
