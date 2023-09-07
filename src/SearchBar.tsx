import { useState } from "react";
import { CityCard } from "./CityCard";
import { Card, TextField, Button } from '@mui/material';
import {Weather, Climate } from "./Weather";
import axios from 'axios';
import './SearchBar.css';


const SearchBar = () => {
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(false);
  const [searching, setSearching] = useState(true);
  const [weather, setWeather] = useState<Weather>({description: "test", icon: Climate.none  } as Weather);

  const onSearchCity = () => {
    api()
  }

  const handleOnKeyUp = (e:any) => {
    setCityName(e.target.value)
    setSearching(true) 
    setError(false)
    if(e.key === "Enter") {
      setCityName(e.target.value)
      api()
    }
  }

  async function api(){
    setSearching(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=b1a1bc27e4724b24981239941992644d`
    //const url = `http://localhost:8080/getBogota`
    try {
      const responseWeather = await axios.get(url)
      const lat = responseWeather.data.coord.lat;
      const lon = responseWeather.data.coord.lon;
      const urlAll = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=b1a1bc27e4724b24981239941992644d`
      //const urlAll = `http://localhost:8080/getAllBogota`
      
      const responseWeatherAll = await axios.get(urlAll)
      let hourly: [] = responseWeatherAll.data.hourly;
      let filteredHourly : [] = []
      for (let i = 0 ; hourly.length > i; i++) {
        if(i % 3 === 0){
          filteredHourly.push(hourly[i])
        }
      }
      let daily: [] = responseWeatherAll.data.daily;
      let icon = Object.values(Climate).find(x => x === responseWeather.data.weather[0].icon)
      let newWeather: Weather = {
        city: responseWeather.data.name,
        country: responseWeather.data.sys.country,
        description: responseWeather.data.weather[0].description,
        icon: icon ? icon : Climate.none,
        temp: responseWeather.data.main.temp,
        humidity: responseWeather.data.main.humidity,
        temp_min: responseWeather.data.main.temp_min,
        temp_max: responseWeather.data.main.temp_max,
        pressure: responseWeather.data.main.preassure,
        feels_like: responseWeather.data.main.feels_like,
        wind: responseWeather.data.wind.speed,
        daily: daily,
        hourly: filteredHourly.slice(0,9),
      }
      setWeather(newWeather)
      setSearching(false)
      console.log(newWeather)
    }
    catch(error: any){
      setError(true)
      setCityName(`Error: ${error.response.data.message}`)
      setSearching(false)  
    } 
}

  return (
    <div className="initialLayout">
      <div className="searchCard">
            <TextField
              onKeyUp={handleOnKeyUp}
              fullWidth id="fullWidth"
              label="City name"
              error={error}
            >
            </TextField>
      </div>
      <div>
        <Card>
            {searching ? <img height={200} width={200} src={require(`./imgs/loading/loading.gif`)} /> :
              <div>
                {cityName.startsWith("Error: ") ? 
                  <h1>{cityName}</h1>:
                  <CityCard weather={weather}/>
                } 
              </div>
            }
        </Card>
      </div>
    </div>
  );
}

export default SearchBar;
