import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenWeatherModule } from './open-weather/open-weather.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OpenWeatherModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
