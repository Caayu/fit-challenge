import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateBookDto {
  @ApiProperty({ example: "Harry Potter and the Philosopher's Stone" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string

  @ApiProperty({ example: 'J. K. Rowling' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  author!: string

  @ApiProperty({ example: '1997-06-26' })
  @IsISO8601()
  @IsNotEmpty()
  publicationDate!: string

  @ApiProperty({ example: 'A young wizard discovers his magical heritage.' })
  @IsString()
  @IsNotEmpty()
  description!: string

  @ApiProperty({
    example:
      'https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg',
    description: 'URL or path to the book cover image'
  })
  @IsString()
  @IsNotEmpty()
  image!: string
}
