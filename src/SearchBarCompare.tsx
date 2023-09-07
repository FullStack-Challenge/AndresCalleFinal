import { useState } from "react";
import { CityCard } from "./CityCardDeleteable";
import { Card, TextField, Button } from '@mui/material';
import {Weather, Climate } from "./Weather";
import axios from 'axios';
import './SearchBar.css';


const SearchBar = () => {
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(false);
  const [searching, setSearching] = useState(true);
  const [cities, setCities] = useState<Weather[]>([]);

  const onSearchCity = () => {
    api()
  }

  const handleOnKeyUp = (e:any) => {
    setCityName(e.target.value)
    if(cities.length === 0){
      setSearching(true) 
    }
    setError(false)
    if(e.key === "Enter") {
      setCityName(e.target.value)
      api()
    }
  }

  const deleteCard = (name: string) => {
    console.log("Calling deletes")
    console.log(`id ${name}`)
    console.log(cities)
    setCities(prev => {
      let newArray = cities.filter(x => x.city !== name)
      console.log(newArray)
      return newArray
    })
    
  }

  async function api(){
    setSearching(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=b1a1bc27e4724b24981239941992644d`
    //const url = `http://localhost:8080/getBogota`
    try {
      const responseWeather = await axios.get(url)
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
        daily: [],
        hourly: [],
      }
      setSearching(false)
      let newArray : Weather[] = []
      newArray = newArray.concat(cities)
      newArray.push(newWeather)
      setCities(newArray)
      console.log(newArray)
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
            {searching ? <img height={200} width={200} src={require(`./imgs/loading/search.gif`)} /> :
              <div>
                {cityName.startsWith("Error: ") ? 
                  <h1>{cityName}</h1>:
                  <div>{
                    cities.map((cityWeather, index) => 
                      <CityCard 
                        weather={cityWeather} 
                        deleteFunction={deleteCard}
                    />)}
                  
                  </div>
                } 
              </div>
            }
        </Card>
      </div>
    </div>
  );
}

export default SearchBar;
