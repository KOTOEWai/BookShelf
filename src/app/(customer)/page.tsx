
'use client';
import Image from "next/image";
import bookSmartBoy from '../../public/smart-boy-reading-book_1308-146055.avif';

import { motion } from 'framer-motion';
import Category from "@/components/category"
export default  function Home() {
    
  return (
    <>
     <div className="md:flex  md:justify-around ">

      <motion.div
       initial ={{x: -100}}
       animate={{x: 0}}
       transition={{duration: 2}}
      className="">

      <h1 className="text-5xl  md:text-7xl  text-center mt-10 font-bold  text-balance" >
       Welcome to<br/> 
       Your <br/>Book Haven
      </h1>
      <div className="flex gap-5 justify-center">
      <button className=" mt-6 bg-blue-600 text-white p-5 rounded-4xl">
        Get Started
      </button>
      <button className=" mt-6 bg-white-600 text-black p-4 rounded-4xl border-4 border-indigo-500/100 ">
        learn more
      </button>
      </div>
      </motion.div>


     <motion.div
     initial={{x: 100}}
     animate={{x: 0}}
     transition={{duration: 2,
     }}
    
     className="m-10">
    
<form className="max-w-md mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search books....." required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

      <Image 
      width={300}
      height={300}
      src={bookSmartBoy} alt ='bookShelf'/>
      </motion.div>

     </div>
    
       <Category/>

    </>
  );
}


