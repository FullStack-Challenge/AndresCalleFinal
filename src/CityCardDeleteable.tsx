import {Weather, Climate} from "./Weather"
import './CityCard.css';
type Props = {
  weather: Weather,
  deleteFunction: (name: string) => void,
};
export const CityCard: React.FC<Props> = ({
  weather,
  deleteFunction,
}) => (
  <div>
    <div className="containerComplete">
      <div className="citycontainer-d">
      <img 
        onClick={() => {deleteFunction(weather.city)}} 
        className="deleteButton"  
        src={require(`./imgs/delete.png`)}
      />
        <div className="citySumary-d">
          <p className="title-d"> {weather.city}, {weather.country}</p>
          <p className="cityInfo-d"> 
            Description: {weather.description} <br/>
            Temperature: {weather.temp}°<br/>
            Feels like: {weather.feels_like}<br/>
            Wind: {weather.wind}<br/>
            Humidity: {weather.humidity}
          </p> 
        </div>
        <div className="mainImage-d">
          {getImage(weather.icon)}
        </div>
      </div>
    </div>
  </div>
);

const getImage = (climate: Climate) => {
  return (<img src={require(`./imgs/${climate}.svg`)}/>
)}


