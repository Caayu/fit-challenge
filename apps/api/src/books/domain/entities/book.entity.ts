import { InvalidBookDataError } from '../errors/book.errors'

export class Book {
  private readonly id?: number
  private title: string
  private author: string
  private publicationDate: Date
  private description: string
  private image: string
  private readonly createdAt: Date
  private updatedAt: Date

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

  public update(
    props: Partial<{
      title: string
      author: string
      publicationDate: string | Date
      description: string
      image: string
    }>
  ): void {
    if (props.title !== undefined) this.title = props.title
    if (props.author !== undefined) this.author = props.author
    if (props.publicationDate !== undefined)
      this.publicationDate = new Date(props.publicationDate)
    if (props.description !== undefined) this.description = props.description
    if (props.image !== undefined) this.image = props.image

    this.updatedAt = new Date()
    this.validate()
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
