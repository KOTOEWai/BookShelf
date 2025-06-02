'use server';

import { addBook } from "@/app/api/fetchBook/book";



export type Errors = {
  BookName?: string;
  Author?: string;
  category?: string;
  Price?: string;
  BookLink?: string;
  Image?: string;
  Description?: string;
  instock?: string;
};

export type FormState = {
  errors: Errors;
};

export async function createBook(prevState: FormState, formData: FormData): Promise<FormState> {
  const BookName = formData.get("BookName") as string;
  const Author = formData.get("Author") as string;
  const category = formData.get("category") as string;
  const Price = formData.get("Price") as string;
  const BookLink = formData.get("BookLink") as string;
  const Image = formData.get("Image") as string;
  const Description = formData.get("Description") as string;
  const instock = formData.get("instock") as string;
  const bookId = formData.get("BookId") as string;
  const imageId = formData.get("ImageId") as string;
  const errors: Errors = {};

  if (!BookName) errors.BookName = "Book Name is required";
  if (!Author) errors.Author = "Author is required";
  if (!category) errors.category = "Category is required";
  if (!Price || isNaN(parseInt(Price))) errors.Price = "Valid price is required";
  if (!BookLink) errors.BookLink = "Book link is required";
  if (!Image) errors.Image = "Image link is required";
  if (!Description) errors.Description = "Description is required";
  if (!instock || isNaN(parseInt(instock))) errors.instock = "Valid stock count is required";

  if (Object.keys(errors).length > 0) return { errors };

  await addBook(BookName, Author, category, parseInt(Price), BookLink, Image, Description, parseInt(instock),bookId,imageId);

  return { errors: {} };
 
}
