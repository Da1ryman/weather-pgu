import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherController } from './open-weather.controler';
import { OpenWeatherService } from './open-weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [ConfigModule, HttpModule],
    controllers: [OpenWeatherController],
    providers: [OpenWeatherService],
})
export class OpenWeatherModule {}
