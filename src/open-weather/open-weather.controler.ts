import { Controller, Get, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { OpenWeatherService } from "./open-weather.service";
import { OpenWeatherAPIKeyDTO } from "./dto/api-key.dto";
import { OpenWeatherCoordsDTO } from "./dto/coord.dto";
import { WeatherDto } from "./dto/wether.dto";



@ApiTags('open-weather')
@Controller('open-weather')
export class OpenWeatherController {

  constructor(private readonly openWeatherService: OpenWeatherService){};

    @Get('api-key')
    @ApiResponse({
      type: OpenWeatherAPIKeyDTO,
      status: 200,
    })
     getApiKey(): OpenWeatherAPIKeyDTO {
      return this.openWeatherService.getApiKey();
     };

    @Get('/coords-by-city')
    @ApiResponse({
      type: OpenWeatherCoordsDTO,
      status: 200
    })
    getCoordsByName(@Query('cityName') cityName: string): Promise<OpenWeatherCoordsDTO> {
      return this.openWeatherService.getCoordsByCity(cityName);
    };

    @Get('/weather-by-coords')
    @ApiResponse({
      type: WeatherDto,
      status: 200,
    })
    getWeatherByCoords(@Query('lon') lon: string, @Query('lat') lat: string): Promise<WeatherDto> {
      return this.openWeatherService.getWeatherByCoord(lon, lat);
    };

    @Get('/weather-by-city')
    @ApiResponse({
      type: WeatherDto,
      status: 200,
    })
    getWeatherByCity(@Query('cityName') cityName: string): Promise<WeatherDto> {
      return this.openWeatherService.getWeatherByCity(cityName);
    };
}