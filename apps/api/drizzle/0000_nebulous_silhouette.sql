CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"publication_date" date NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL
);
