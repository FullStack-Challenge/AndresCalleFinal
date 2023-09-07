import { useState } from "react";
import Moment from 'moment';
import {Weather, Climate} from "./Weather"
import './CityCard.css';
import { Card } from '@mui/material';
import { BasicInfoCard, DailyCard, HourlyCard } from "./CityCards";

type Props = {
  weather: Weather,
};
export const CityCard: React.FC<Props> = ({
  weather,
}) => (
  <div>
    <div className="container">
      <BasicInfoCard weather={weather}/>
      <div className="horlyContainer">
        <HourlyCard weather={weather}></HourlyCard>
      </div>
    </div>
    <div>
      <DailyCard weather={weather}></DailyCard>
    </div>
  </div>
);