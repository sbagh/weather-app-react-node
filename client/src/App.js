import React, { useState, useEffect } from "react";

const api = {
   key: "8b94a4727a066da3ccd11a38b8e433a1",
   base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
   //searchbar query/setQuery
   const [query, setQuery] = useState("");

   //openweatherAPI results
   const [weather, setWeather] = useState({});

   //function which takes the user searched city and fetches the weather results
   const search = (evt) => {
      if (evt.key === "Enter") {
         fetch(`${api.base}weather?q=${query}&units=metric&&appid=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
               setWeather(result);
               setQuery("");
               console.log(result);
            });
      }
   };

   //chaning the background image that is sent from backend(server.js)
   const [img, setBackgroundImage] = useState("");

   useEffect(() => {
      if (weather.name && weather.main && weather.sys) {
         fetch(
            `http://localhost:5200/getImage?city=${weather.name}&country=${weather.sys.country}&weatherForecast=${weather.weather[0].description}`
         )
            .then((res) => res.json())
            .then((data) => {
               console.log(img);
               console.log(data);
               setBackgroundImage(data.image);
            });
      }
   });

   // build date for the date function below
   const dateBuilder = (d) => {
      const months = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ];
      const days = [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday",
      ];

      let day = days[d.getDay()];
      let month = months[d.getMonth()];
      let date = d.getDate();
      let year = d.getFullYear();

      return `${day}, ${date} ${month} ${year}`;
   };

   return (
      <div className="app">
         <main>
            <div className="search-box">
               <input
                  type="text"
                  className="search-bar"
                  placeholder="Search city..."
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  onKeyDown={search}
               />
            </div>
            {typeof weather.main != "undefined" ? (
               <div>
                  <div className="location-box">
                     <div className="location">
                        {weather.name}, {weather.sys.country}
                     </div>
                     <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                  <div className="weather-box">
                     <div className="temperature"> {weather.main.temp} °c</div>
                     <div className="weather">
                        {weather.weather[0].description}
                     </div>
                  </div>
                  <img width={"100%"} height={"100%"} src={img} />
               </div>
            ) : (
               ""
            )}
         </main>
      </div>
   );
}

export default App;
