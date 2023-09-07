export enum Climate {
    clear_sky = "01d",
    few_clouds = "02d",
    scattered_clouds = "03d",
    broken_clouds = "04d",
    shower_rain = "09d",
    rain = "10d",
    thunderstorm = "11d",
    snow = "13d",
    mist = "50d",
    clear_skyn = "01n",
    few_cloudsn = "02n",
    scattered_cloudsn = "03n",
    broken_cloudsn = "04n",
    shower_rainn = "09n",
    rainn = "10n",
    thunderstormn = "11n",
    snown = "13n",
    mistn = "50n",
    none = "01d"
  }

export class Weather {
  country: string = "";
    city: string = "";
    description: string = '';
    temp: number = 0;
    feels_like: number = 0;
    temp_min: number = 0;
    temp_max: number = 0;
    pressure: number = 0;
    humidity: number = 0;
    wind: number = 0;
    icon: Climate = Climate.none;
    daily: any[] = [];
    hourly: any[] = [];
}

