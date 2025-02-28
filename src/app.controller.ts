import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService : ConfigService ) {}

  @Get()
  getHello() {
    return "Hello, this my first project in Backend development."
  }

}

