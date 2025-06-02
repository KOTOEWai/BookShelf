'use client'
import { motion } from "framer-motion";
import NextImage from "next/image";

const MotionImage = motion(NextImage);

import { useSession } from "next-auth/react";
import Link from "next/link";
export default function Page() {
  const { data: session } = useSession();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <MotionImage
            src={session?.user.image}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full mx-auto border-4 border-blue-500"
          />
        </motion.div>

        <motion.h2
          className="text-xl font-bold text-gray-800"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {session?.user.name}
        </motion.h2>

        <p className="text-gray-500 mt-1">Book Enthusiast & Reviewer</p>

        <motion.div
          className="mt-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-gray-600">Email:  {session?.user.email}</p>
          <p className="text-sm text-gray-600">Location: New York, USA</p>
        </motion.div>

        <motion.button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Edit Profile
        </motion.button>

          <motion.button
          className="mt-6  ms-3  px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={'/saveBooks'} >
           Your Books
          </Link>
         
        </motion.button>
      </motion.div>
    </div>
  );
}
