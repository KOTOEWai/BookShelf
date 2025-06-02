import { configureStore } from '@reduxjs/toolkit';
import savedBookReducer from './features/savedBooks/book';

export const store = configureStore({
     reducer: {
        savedBook: savedBookReducer ,
        
     }
})

export type  RootState = ReturnType<typeof store.getState> ;
export type AppDispatch = typeof store.dispatch;
