import { useState } from "react";
import Moment from 'moment';
import {Weather, Climate} from "./Weather"
import './CityCard.css';
import { Card } from '@mui/material';

type Props = {
  weather: Weather,
};

export const DailyCard: React.FC<Props> = ({weather}) => {
  return <div>
  <Card className="dailyCard">
    {weather.daily.map((item: any, i: number) => {
        return (
          <div className="dailyObject" key={i}>
            <h6>{convertDateDay(item.dt)}</h6>
            {getImage(item.weather[0].icon)}
            <h6>{item.temp.day}°</h6>
          </div>
        );
      })}
    </Card>
</div>
}

export const HourlyCard: React.FC<Props> = ({weather}) => {
  return <div className="grow">
  <Card>
    {weather.hourly.map((item: any, i: number) => {
        return (
          <div key={i} className="hourlyCard">
            <div className="houlyImage">
              {getImage(item.weather[0].icon)}
            </div>
            <p>{item.temp}° <br/>{convertDate(item.dt)}</p>
          </div>
        );
      })}
    </Card>
</div>
}

export const BasicInfoCard: React.FC<Props> = ({weather}) => {
  return(
  <div className="citycontainer">
    <h1>{weather.city}, {weather.country}</h1>
    <div className="citySumary">
      <div className="mainImage">
        {getImage(weather.icon)}
      </div>
      <p className="cityInfo"> 
        {weather.description}<br/>
        Temperature: {weather.temp}°<br/>
        Feels like: {weather.feels_like}<br/>
        Wind: {weather.wind}<br/>
        Humidity: {weather.humidity}
      </p> 
    </div>
  </div>
  )
}

const getImage = (climate: Climate) => {
  return (<img src={require(`./imgs/${climate}.svg`)}/>
)}

const convertDate = (value: string):string => {
  const timestamp: number = +value;
  const date: Date = new Date(timestamp * 1000);
  return (Moment(date)).format('DD MMM HH:mm')
}

const convertDateDay = (value: string):string => {
  const timestamp: number = +value;
  const date: Date = new Date(timestamp * 1000);
  return (Moment(date)).format('dddd')
}
