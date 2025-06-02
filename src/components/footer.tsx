'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-white py-6 mt-20"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold">📚 BookShelf</p>
          <p className="text-sm text-gray-400">Your gateway to knowledge and stories.</p>
        </div>

        <div className="flex space-x-6 text-sm">
          <Link href="/" className="hover:text-purple-400 transition duration-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-purple-400 transition duration-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-purple-400 transition duration-300">
            Contact
          </Link>
        </div>

        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} BookVerse. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}
