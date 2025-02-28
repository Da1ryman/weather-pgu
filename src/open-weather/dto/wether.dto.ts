import { ApiProperty } from "@nestjs/swagger";
import { OpenWeatherCoordsDTO } from "./coord.dto";

export class WeatherDto {
    @ApiProperty({ example: 16.12 })
    temperature!: number;
  
    @ApiProperty({ example: 16 })
    feelsLikeTemperature!: number;
  
    @ApiProperty({ example: 1012 })
    atmosphericPressure!: number;
  
    @ApiProperty({ example: 4.37 })
    windSpeed!: number;
  
    @ApiProperty({ example: 'RU' })
    countryCode!: string;
  
    @ApiProperty({ example: 'Pyatigorsk' })
    cityName!: string;
  
    @ApiProperty({ type: OpenWeatherCoordsDTO })
    cords: OpenWeatherCoordsDTO;
  }