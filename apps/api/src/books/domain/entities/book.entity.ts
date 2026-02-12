import { InvalidBookDataError } from '../errors/book.errors'

export class Book {
  private readonly id?: number
  private readonly title: string
  private readonly author: string
  private readonly publicationDate: Date
  private readonly description: string
  private readonly image: string
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor(props: {
    id?: number
    title: string
    author: string
    publicationDate: string | Date
    description: string
    image: string
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.id = props.id
    this.title = props.title
    this.author = props.author
    this.publicationDate = new Date(props.publicationDate)
    this.description = props.description
    this.image = props.image
    this.createdAt = props.createdAt || new Date()
    this.updatedAt = props.updatedAt || new Date()

    this.validate()
  }

  private validate(): void {
    if (!this.title) {
      throw new InvalidBookDataError('Title is required')
    }
    if (!this.author) {
      throw new InvalidBookDataError('Author is required')
    }
    if (!this.image) {
      throw new InvalidBookDataError('Cover image is required')
    }

    if (this.publicationDate > new Date()) {
      throw new InvalidBookDataError('Publication date cannot be in the future')
    }
  }

  public getProps() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      publicationDate: this.publicationDate,
      description: this.description,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
