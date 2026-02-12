import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import {
  FileSizeValidationPipe,
  FileTypeValidationPipe
} from './file-validation.pipe'
import { multerConfig } from './upload.config'
import { UploadService } from './upload.service'

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @ApiOperation({ summary: 'Upload an image file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Image file (jpeg, png, gif, webp). Max size: 5MB.'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully.',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: '/uploads/images/filename.jpg' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (File missing, invalid type, or too large).'
  })
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadFile(
    @UploadedFile(new FileSizeValidationPipe(), new FileTypeValidationPipe())
    file: Express.Multer.File
  ) {
    return this.uploadService.uploadImage(file)
  }
}
