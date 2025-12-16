"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  const { data: session, status } = useSession();

  // Prevent hydration mismatch
  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <motion.div
        className="w-full max-w-sm p-6 text-center bg-white shadow-xl rounded-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="mb-4">
          <Image
            src={session?.user?.image || "/default-profile.png"}
            alt="Profile Picture"
            width={120}
            height={120}
            className="mx-auto border-4 border-blue-500 rounded-full"
          />
        </motion.div>

        <motion.h2 className="text-xl font-bold text-gray-800">
          {session?.user?.name}
        </motion.h2>

        <motion.div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">Email: {session?.user?.email}</p>
        </motion.div>

        <motion.button className="px-4 py-2 mt-6 text-white bg-blue-500 rounded-xl">
          Edit Profile
        </motion.button>

        <motion.button className="px-4 py-2 mt-6 text-white bg-blue-500 rounded-xl ms-3">
          <Link href="/saveBooks">Your Books</Link>
        </motion.button>
      </motion.div>
    </div>
  );
}
