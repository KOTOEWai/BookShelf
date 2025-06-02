import { createSlice , PayloadAction  } from "@reduxjs/toolkit";

export interface Book {
    bookId: string;
    BookName: string;
    Image: string;
}

interface savedBookState {
    book:Book[];
 
}

const initialState: savedBookState =  {
    book:[] ,
  
}




const savedBooksSlice = createSlice({
       name: 'savebook',
       initialState,
       reducers: {
           savedBook : ( state , action: PayloadAction<Book>) =>  {
             const exists = state.book.find(book => book.bookId === action.payload.bookId);
             if(!exists){
                state.book.push(action.payload);
                localStorage.setItem("savedBooks", JSON.stringify(state.book))
             }
             
           },
           unsaveBook : ( state , action:PayloadAction<string>) => {
                  state.book = state.book.filter( book => book.bookId!== action.payload);
                 localStorage.setItem("savedBooks" ,JSON.stringify(state.book))
           },

       }
})

export const{ savedBook, unsaveBook } = savedBooksSlice.actions;
export default savedBooksSlice.reducer;