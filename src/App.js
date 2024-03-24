import React from "react";
import pin from "./assets/pin_icon.png";

function App() {
  const [search, setSearch] = React.useState("");
  const [weather, setWeather] = React.useState({});

  const searchPressed = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=cbb7ddcf0a91815c86d4aa8557bf7743`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input
            type="text"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for a city..."
          />
          <button onClick={searchPressed} className="btn bold">
            Search
          </button>
        </div>
        {weather.name == undefined && (
          <div>
            <p className="intro">Enter a city name </p>
            <p className="intro">to show the weather data</p>
          </div>
        )}
        {weather.name !== undefined && (
          <div className="top">
            <div className="location">
              <p>{weather.name}</p>
              {weather.sys ? (
                <p className="country">({weather.sys.country})</p>
              ) : null}
            </div>
            <div className="map">
              <img src={pin} className="icon" alt="" />
              <a
                target="blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/${weather.name}`}
                className="google-maps"
              >
                View on Google Maps
              </a>
            </div>

            <div className="temp">
              {weather.main ? (
                <h1>
                  {weather.main.temp.toFixed()}
                  <span className="celzius">°C</span>
                </h1>
              ) : null}
            </div>
            <div className="description">
              {weather.weather ? <p>{weather.weather[0].main}</p> : null}
            </div>
          </div>
        )}

        {weather.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {weather.main ? (
                <p className="bold">
                  {weather.main.feels_like.toFixed()}
                  <span className="celzius2">°C</span>
                </p>
              ) : null}

              <p className="smaller">Feels Like</p>
            </div>
            <div className="humidity">
              {weather.main ? (
                <p className="bold">
                  {weather.main.humidity}
                  <span className="celzius2">%</span>
                </p>
              ) : null}

              <p className="smaller">Humidity</p>
            </div>
            <div className="wind">
              {weather.wind ? (
                <p className="bold">
                  {weather.wind.speed}
                  <span className="celzius2">km/h</span>
                </p>
              ) : null}

              <p className="smaller">Wind Speed</p>
            </div>
          </div>
        )}
        {/* comp2 */}
        {weather.name !== undefined && (
          <div className="bottom">
            <div className="wind2 ">
              {weather.weather ? (
                <p className="bold">{weather.weather[0].description}</p>
              ) : null}

              <p className="smaller">Description</p>
            </div>

            <div className="feels">
              {weather.main ? (
                <p className="bold">
                  {weather.clouds.all}
                  <span className="celzius2">%</span>
                </p>
              ) : null}

              <p className="smaller">Cloudiness</p>
            </div>
            <div className="feels">
              {weather.main ? (
                <p className="bold">
                  {weather.main.pressure}
                  <span className="celzius2">hPa</span>
                </p>
              ) : null}

              <p className="smaller">Pressure</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
