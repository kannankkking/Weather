import { useEffect, useState } from 'react'
import proptypes from "prop-types"
import searchIcon from './assets/search.png'
import cloudsun from './assets/cloud.png'
import humidity from './assets/hum.png'
import winds from './assets/wind.jpg'
import SunImages from './assets/sun.jpg'
import drizzle from './assets/drizzle.png'
import snow from './assets/snow.jpg'
import rain from './assets/rain.png'
import "./App.css"

const WeatherDetails = ({icon,temp,city,country,lat,log,hum,windy}) =>{
  return(
    <>
      <div className="images">
        <img src={icon} alt="" />
      </div>
      <div className="tem">{temp}°C 
        <img src={temp} alt="" />
      </div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
            <span className="lat">Latitude</span>
            <span className="lat">{lat}</span>
        </div>
        <div>
            <span className="log">Longitude</span>
            <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="images" className='icon'/>
          <div className="data">
            <div className="humidity-percentage">{hum}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={winds} alt="images" className='icon'/>
          <div className="data">
            <div className="wind-percentage">{windy} Km/H</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
       
      </div>
    </>
  )
}

function App() {
  let apiKey = "065eeed549d5ef6b6fa2c1e8213fea62";
  const [text, setText] = useState("")


  const [icon, setIcon] = useState(SunImages)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("India")
  const [lat, setlat] = useState(0)
  const [log, setlog] = useState(0)
  const [hum, setHum] = useState(85)
  const [wind, setWind] = useState(0);
  const [CityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const weatherMap = {
    "01d" : SunImages,
    "01n" : SunImages,
    "02d" : cloudsun,
    "02n" : cloudsun,
    "03d" : cloudsun,
    "03n" : cloudsun,
    "04d" : drizzle,
    "04n" : drizzle,
    "09d" : rain,
    "09n" : rain,
    "10d" : rain,
    "10n" : rain,
    "13d" : snow,
    "13n" : snow,
  };
  
  const search = async () =>{
    setLoading(true);
    let Url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
    try{
      let res = await fetch(Url);
      let data = await res.json();
      if(data.cod === "404"){
        console.error("City Not Found")
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHum(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name)
      setCountry(data.sys.country);
      setlat(data.coord.lat);
      setlog(data.coord.lon);
      setMaxtemp(data.main.temp_max);
      setMintemp(data.main.temp_min);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherMap[weatherIconCode] || SunImages);
      setCityNotFound(false);
    }
    catch(error){
      console.log("An Error occured:", error.message);
    }
    finally{
      setLoading(false);
    }
  };

  const handleCity = (e) =>{
    setText(e.target.value)
  };
  const handleKeyDown = (e) =>{
    if (e.key === "Enter"){
      search();
    }
  };
  useEffect(function(){
    search();
  }, [])
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" placeholder='Search City' className='cityInput' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={() =>search()}>
            <img src={searchIcon} alt="search" />
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} hum={hum} wind={wind} />
        <p className="copyright">
          Designed By <span>Kannan</span>
        </p>
      </div>
    </>
  )
}
WeatherDetails.Proptypes = {
  icon: proptypes.string.isRequired,
  temp: proptypes.number.isRequired,
  city: proptypes.string.isRequired,
  humidity: proptypes.number.isRequired,
  winds: proptypes.number.isRequired,
  lat: proptypes.number.isRequired,
  log: proptypes.number.isRequired,
  maxtemp: proptypes.number.isRequired,
  mintemp: proptypes.number.isRequired,
}
export default App
