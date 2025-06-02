import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    BookName: {  type : String , required : [true , "Author is required"]  },
    Author: {  type : String , required : [true , "Author is required"]  },
    category: {
    type: String,
    required: true,
    enum: ['ဝတ္ထု', 'သုတ', 'သမိုင်း', 'ဘာသာရေး', 'တိုးတက်ရေး', 'ပညာရေး'], 
    default: 'ဝတ္ထု',
  },    
    Price : {  type : Number ,  required : [ true , "price is required"], min : [ 0 , "price can not be negative"] },
    BookLink : {  type : String , required : [true , "BookLink is required"] },
    Image : { type : String, required : [true , "ImageLink is required"] },
    Description : {  type : String , required : [true , "Description is required"] },
    instock : { type : Number , default : 0 , required : [true, "instock is required"], min : [ 0 , "instock can not be negative"] },
    Rating : { type : Number , default : 0 , required : [true, "Rating is Required" ] , min : [0, "Rating can not be negative"] },
    bookId : String ,
    imageId : String 
}, {
    timestamps: true
})

export const BookModal = mongoose.models.Book || mongoose.model("Book", BookSchema);