import { ApiProperty } from "@nestjs/swagger";

export class OpenWeatherCoordsDTO {
    @ApiProperty({example: 'lat'})
    lat!: string

    @ApiProperty({example: 'lon'})
    lon!: string
}