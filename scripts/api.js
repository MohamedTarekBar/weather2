export default class WeatherApi {
  constructor () {
    this.baseUrl = 'https://api.weatherapi.com/v1/';
    this.Apikey = 'key=4615d98babb24f8d8f7101245221510&';  
    this.qKey = 'q=';
    this.days = '&days=7'
    this.unnessery_param = '&aqi=no&alerts=no'
    this.endpoints = {
      current: 'current.json?',
      forecast: 'forecast.json?',
    };
  }

  async getforecast (q) {
    const result = await fetch (
      `${this.baseUrl}${this.endpoints.forecast}${this.Apikey}${this.qKey}${q}${this.days}${this.unnessery_param}`
    );
    const finalRes = await result.json ();
    return finalRes;
  }
}


