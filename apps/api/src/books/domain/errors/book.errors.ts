export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class InvalidBookDataError extends DomainError {
  constructor(message: string) {
    super(message)
  }
}

export class BookAlreadyExistsError extends DomainError {
  constructor(title: string, author: string) {
    super(`A book with title "${title}" by author "${author}" already exists.`)
  }
}
