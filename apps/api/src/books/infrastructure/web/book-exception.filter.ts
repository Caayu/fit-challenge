import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'
import {
  BookAlreadyExistsError,
  InvalidBookDataError
} from '../../domain/errors/book.errors'

@Catch(InvalidBookDataError, BookAlreadyExistsError)
export class BookExceptionFilter implements ExceptionFilter {
  catch(
    exception: InvalidBookDataError | BookAlreadyExistsError,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception instanceof InvalidBookDataError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: 'Bad Request'
      })
      return
    }

    if (exception instanceof BookAlreadyExistsError) {
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: exception.message,
        error: 'Conflict'
      })
      return
    }
  }
}
