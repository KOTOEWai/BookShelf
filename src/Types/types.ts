import { Key } from "react";

export type Book = {
  imageId: string;
  bookId: string;
  index: Key | null | undefined;
  _id: string;
  BookName: string;
  Author: string;
  category: string;
  Price:  number;
  BookLink: string;
  Image: string;
  Description: string;
  instock: string;
  Rating: string;
  createdAt:string | undefined;
};





export type Rating = {
  rating:number;
  comment:string;
  userId?: {
    name:string,
    image:string 
  }
  bookId:string
}