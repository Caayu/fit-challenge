import { IsISO8601, IsString } from 'class-validator'

export class CreateBookDto {
  @IsString()
  title!: string

  @IsString()
  author!: string

  @IsISO8601()
  publicationDate!: string

  @IsString()
  description!: string

  @IsString()
  image!: string
}
