import { ApiProperty } from "@nestjs/swagger";

export class OpenWeatherAPIKeyDTO {
    @ApiProperty({example: 'your-api-key'})
    apiKey!: string
}