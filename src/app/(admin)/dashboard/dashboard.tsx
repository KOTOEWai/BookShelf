'use client'

import { useState } from "react";
import book from '@/public/book.jpg'
import user from '@/public/user.avif'
import Image from "next/image";
import UserForm from "@/components/UserForm";
import BookForm from "@/components/BookForm";

export default function AdminManagePage() {
 
  const [activeSection, setActiveSection] = useState<"user" | "order" | "book" | null>(null);
  const sections = [
    {
      key: "user",
      label: "Manage Users",
      image: user
    },
    {
      key: "book",
      label: "Manage Books",
      image:book
    
    },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "user":
        return <UserForm/>;
      case "book":
        return <BookForm/>;
      default:
        return null;
    }
  };

  return (
        <div className="m-10">
          <section className="grid   md:grid-cols-3  gap-3 md:gap-5 md:mt-4 mx-14">
            {sections.map(({ key, label,image  }) => (
              <div
                key={key}
                role="button"
                tabIndex={0}
                aria-pressed={activeSection === key}
                onClick={() => setActiveSection(key as "user" | "order" | "book")}
                className="flex items-center p-4 md:p-8 bg-white shadow rounded-lg"
              >
                <div className='inline-flex items-center justify-center h-10 w-10 md:h-16 md:w-16 rounded-full mr-6 '>
                  <Image src={image} alt={key}></Image>
                </div>
                <div>
                  <span className="block text-gray-500">{label}</span>
                </div>
              </div>
            ))}

          
          </section>
          {activeSection && (
              <div className="transition-all duration-300 ease-in-out">
                {renderSectionContent()}
              </div>
            )}
        </div>
     
    
  );
}
