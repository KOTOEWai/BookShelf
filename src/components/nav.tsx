'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import profile from "@/public/profile.webp"
import Image from 'next/image';
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Toggle main menu</span>
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

          {/* Logo and desktop nav */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center text-white text-xl font-bold me-20">📚 BookShelf</div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 ">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {session ? (
              <div className="flex space-x-3">
                <Link href={'/profile'} className="text-gray-300 text-sm sm:inline">
              {session.user.image ? (
              <Image 
              width={50}
              height={50}
              src={session.user.image}
               alt ='profile'
               className="rounded-full "
               /> ) : (
                <Image 
              width={50}
              height={40}
              src={profile}
               alt ='profile'
               className="rounded-full md:p-3"
               />
               )
              }
                </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-md bg-red-600 px-1 md:px-3 md:py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className='space-x-4'>
              <Link
                href="/login"
                className="rounded-md bg-blue-600 px-1 md:px-3 py-2 text-sm md:font-medium text-white hover:bg-blue-700"
              >
                Sign In
              </Link>
               <Link
                href="/register"
                className="rounded-md bg-blue-600 px-1 md:px-3 py-2 text-sm md:font-medium text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu items */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}

          
          </div>
        </div>
      )}
    </nav>
  );
}
