"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";

export interface SavedBook {
  bookId: string;
  BookName: string;
  Image: string;
  Author?: string;
  Description?: string;
  Price?: number;
  category?: string;
  createdAt?: string;
  BookLink?: string;
}

interface SavedBooksContextType {
  books: SavedBook[];
  saveBook: (book: SavedBook) => void;
  unsaveBook: (bookId: string) => void;
}

const SavedBooksContext = createContext<SavedBooksContextType | undefined>(
  undefined
);

  ///////////////////////
 //       Reducer     //
// ------------------//
type Action =
  | { type: "LOAD_BOOKS"; payload: SavedBook[] }
  | { type: "ADD_BOOK"; payload: SavedBook }
  | { type: "REMOVE_BOOK"; payload: string };

function savedBooksReducer(state: SavedBook[], action: Action): SavedBook[] {
  switch (action.type) {
    case "LOAD_BOOKS":
      return action.payload;

    case "ADD_BOOK":
      if (state.some((b) => b.bookId === action.payload.bookId)) {
        return state; // already exists
      }
      return [...state, action.payload];

    case "REMOVE_BOOK":
      return state.filter((b) => b.bookId !== action.payload);

    default:
      return state;
  }
}

// -------------------------
// Provider
// -------------------------
export function SavedBooksProvider({ children }: { children: ReactNode }) {
  const [books, dispatch] = useReducer(savedBooksReducer, []);

  // Load from localStorage once
  useEffect(() => {
    const storedData = localStorage.getItem("savedBooks");
    if (storedData) {
      dispatch({ type: "LOAD_BOOKS", payload: JSON.parse(storedData) });
    }
  }, []);

  // Save to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("savedBooks", JSON.stringify(books));
  }, [books]);

  const saveBook = (book: SavedBook) => {
    dispatch({ type: "ADD_BOOK", payload: book });
  };

  const unsaveBook = (bookId: string) => {
    dispatch({ type: "REMOVE_BOOK", payload: bookId });
  };

  return (
    <SavedBooksContext.Provider value={{ books, saveBook, unsaveBook }}>
      {children}
    </SavedBooksContext.Provider>
  );
}

// -------------------------
// Hook
// -------------------------
export const useSavedBooks = () => {
  const context = useContext(SavedBooksContext);
  if (!context) {
    throw new Error("useSavedBooks must be used inside SavedBooksProvider");
  }
  return context;
};
