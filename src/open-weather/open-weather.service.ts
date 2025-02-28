import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherAPIKeyDTO } from './dto/api-key.dto';
import { OpenWeatherCoordsDTO } from './dto/coord.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OpenWeatherCordsWeatherData, OpenWeatherLocation } from './open-weather.interface';
import { WeatherDto } from './dto/wether.dto';

@Injectable()
export class OpenWeatherService {
    private readonly openWeatherAPIKey: string;
    private readonly openWeatherAPIURL: string;
    private readonly openWeatherGeoAPIURL: string;
    private readonly openWeatherAPIWeatherAPIURL: string;

    constructor(
      private readonly configService: ConfigService,
      private readonly httpService: HttpService,
    ){
      this.openWeatherAPIKey = this.configService.getOrThrow<string>('OPEN_WEATHER_API_KEY');
      this.openWeatherAPIURL = this.configService.getOrThrow<string>('URL');
      this.openWeatherAPIWeatherAPIURL = `${this.openWeatherAPIURL}/data/2.5/weather`;
      this.openWeatherGeoAPIURL = `${this.openWeatherAPIURL}/geo/1.0/direct`;
    }

    public getApiKey(): OpenWeatherAPIKeyDTO {
      return {
        apiKey: this.openWeatherAPIKey,
      };
    }

    public async getCoordsByCity(cityName : string): Promise<OpenWeatherCoordsDTO> {
      const response = await firstValueFrom(
        this.httpService.get<OpenWeatherLocation[]>(`${this.openWeatherGeoAPIURL}?q=${cityName}&appid=${this.openWeatherAPIKey}`)
      );

      const cities = response.data;

      if (!cities.length) {
        throw new NotFoundException(`No city found with name: ${cityName}`);
      };
  
      const firstCityFromResponse = cities[0];
  
      return { lon: firstCityFromResponse.lon, lat: firstCityFromResponse.lat };
    }

    public async getWeatherByCoord(lat: string, lon: string): Promise<WeatherDto> {
      const response = await firstValueFrom(
        this.httpService.get<OpenWeatherCordsWeatherData>(`${this.openWeatherAPIWeatherAPIURL}?lon=${lon}&lat=${lat}&appid=${this.openWeatherAPIKey}`)
      );

      const responseWeatherData = response.data

      const weatherByCoord = {
        temperature: responseWeatherData.main.temp,
        feelsLikeTemperature: responseWeatherData.main.feels_like,    
        atmosphericPressure: responseWeatherData.main.pressure,
        windSpeed: responseWeatherData.wind.speed,
        countryCode: responseWeatherData.sys.country,
        cityName: responseWeatherData.name,
        cords: {lat: lat, lon: lon},
      }

      return weatherByCoord
    }

    public async getWeatherByCity(cityName: string): Promise<WeatherDto> {
      const  responseCoord : Promise<OpenWeatherCoordsDTO> =  this.getCoordsByCity(cityName)
      return this.getWeatherByCoord((await responseCoord).lat, (await responseCoord).lon)
    }
  }