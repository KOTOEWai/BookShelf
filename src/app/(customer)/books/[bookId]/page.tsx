'use client'
import {motion} from "framer-motion"
import { useEffect , useState } from "react";
import {use }from "react"
import BookSkeleton from "@/components/bookLoader";
import { useDispatch } from "react-redux";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { savedBook } from "@/app/features/savedBooks/book";
import { AppDispatch } from "@/app/store";
import RatingForm from "@/components/ratingForm";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type Book = {
  imageId : string;
  bookId : string;
  _id?: string;
  BookName: string;
  Author: string;
  category: string;
  Price: number | string | undefined;
  BookLink: string;
  Image: string;
  Description: string;
  instock: string;
  Rating:string;
  createdAt:string | undefined;
}

type Rating = {
  rating:number;
  comment:string;
  userId?: {
    name:string,
    image:string 
  }
  bookId:string
}

export default  function BookDetails (
    {
        params,
    }:{
        params: Promise< {bookId:string}>
    }
){
    const bookId = use(params).bookId ;
    const { data: session} = useSession();
    const userId = session?.user.id ;
    const [ book , setBook ] = useState<Book>();
    const [loading , setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const [ showRating , setShowRating] = useState<Rating[]>()

  const averageRating = showRating && showRating.length > 0
  ? showRating.reduce((acc, cur) => acc + cur.rating, 0) / showRating.length
  : 0;

  const fetchData = async () => {
  try {
    const [res1, res2] = await Promise.all([
      fetch(`/api/fetchRating?bookId=${bookId}`),
      fetch(`/api/fetchBook/${bookId}`),
    ]);

    const [data1, data2] = await Promise.all([
      res1.json(),
      res2.json(),
    ]);

    setShowRating(data1);
    setBook(data2);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();

}, [bookId]);


const downloadFile = async () => {
  if (!book?.BookLink || !book?.BookName) return;

  try {
    const response = await fetch(book.BookLink);
   
    const blob = await response.blob();
 
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${book.BookName}.pdf`; // ✅ Set filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed", error);
  }
};

if(loading){
  return (
         <BookSkeleton/>
  )
}

const showToastMessage = () => {
      
        toast.success('Book save Successfully', {
          position: "top-center",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
        });
  };
  
const savebook = () => {
    
    if(book) dispatch(savedBook(book))
       showToastMessage();
}

    
    return (
        <>
        <ToastContainer/>
   <div className="">
   <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="flex flex-col md:flex-row w-full mt-5 "
>
  {/* Book Container */}
  <div className="flex flex-col md:flex-row justify-center items-center  md:gap-4 w-[90%] md:w-[50%] mx-auto  p-10  rounded-2xl shadow-2xl">
  
    <motion.img
      src={book?.Image || "https://via.placeholder.com/300x450?text=Book+Cover"}
      alt={book?.BookName || "Book Cover"}
       width={300}
       height={300}
      className="   rounded-xl shadow-md object-cover "
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    />

    {/* Book Info */}
    <div className=" space-y-2">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-3">{book?.BookName}</h1>
      <h2 className="text-lg text-gray-600">✍️ {book?.Author}</h2>
      <p className="text-gray-700">
        {book?.Description && book.Description !== '-' ? book.Description : "No description available."}
      </p>

      <div className="text-sm text-gray-500 space-y-1">
        <p>📚 Category: {book?.category}</p>
        <p>⭐ Rating: {averageRating?.toFixed(1)}</p>
        <p>💵 Price: {book?.Price === 0 ? "Free" : `${book?.Price} Ks`}</p>
        <p>📅 Published: {new Date(book?.createdAt as string).toLocaleDateString("en-GB")}</p>
        
      </div>

      <div className="flex  mt-6">
      
        <button
           onClick={downloadFile}
          className="  rounded-lg transition cursor-pointer"
        >
            <DotLottieReact
     src="https://lottie.host/bd81150e-b4d0-4131-a5a2-17837f09ecff/JuhpaUL3pa.lottie"
      loop
      autoplay
      className="w-40"
    />   
        </button>

        <button
         className=" rounded-lg transition cursor-pointer"
         onClick={savebook}>

    <DotLottieReact
      src="https://lottie.host/db5826d8-fbf5-4433-8d5d-7dd1d89725b7/97KmpZXkFf.lottie"
      loop
      autoplay
      className="w-24"
    />
        </button>
         
      
      </div>
     
    </div>
  
  </div>
 
    
    <div
         className=" rounded-lg transition cursor-pointer m-4 bg-amber-50 p-5"  >
    <section className="rounded-lg  ">
    <h3 className="font-os text-lg font-bold">Comments</h3>

   {showRating?.map((rate, index) => (
  <div key={index} className="flex mt-4">
    <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center">
     
      <Image className="h-9 w-9 rounded-full object-cover" width={100} height={100} src={rate.userId?.image as string} alt="" />
    </div>
    
    <div className="ml-3">
      <p>{rate.userId?.name}</p>
      <div className="text-gray-600">Rating: {rate.rating} </div>
      <div className="mt-2 text-purple-800">{rate.comment}</div>
    </div>
  </div>
))}

  </section>
         <RatingForm bookId={bookId} userId={userId} refreshRatings={fetchData}/>
     </div>

     
</motion.div>
</div>
    </>
    )
}