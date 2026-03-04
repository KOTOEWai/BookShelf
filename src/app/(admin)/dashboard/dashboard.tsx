"use client"

import { useState } from "react";
import book from '@/public/book.jpg'
import user from '@/public/user.avif'
import Image from "next/image";
import UserForm from "@/components/UserForm";
import BookForm from "@/components/BookForm";
import { motion, AnimatePresence } from "framer-motion";
import { Users, BookPlus, ArrowRight, Settings2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminManagePage() {
  const [activeSection, setActiveSection] = useState<"user" | "order" | "book" | null>(null);

  const sections = [
    {
      key: "user",
      label: "Manage Users",
      description: "Review, edit, and manage all registered platform users.",
      image: user,
      icon: Users,
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      key: "book",
      label: "Manage Books",
      description: "Update library, edit details, and add new masterpieces.",
      image: book,
      icon: BookPlus,
      color: "from-accent/20 to-orange-500/20"
    },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "user":
        return <UserForm />;
      case "book":
        return <BookForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {sections.map(({ key, label, description, image, icon: Icon, color }) => (
          <motion.div
            key={key}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection(key as "user" | "book")}
          >
            <Card className={`relative overflow-hidden border-none cursor-pointer group h-full bg-card/40 backdrop-blur-xl shadow-2xl ${activeSection === key ? 'ring-2 ring-accent' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30 group-hover:opacity-50 transition-opacity`} />

              <CardContent className="p-0 flex flex-col sm:flex-row items-stretch">
                <div className="relative w-full sm:w-40 aspect-square sm:aspect-auto overflow-hidden">
                  <Image
                    src={image}
                    alt={key}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-background/50 text-accent">
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-accent/80">Action Center</span>
                  </div>

                  <h3 className="text-2xl font-black text-foreground mb-2">{label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                    Open Management Panel <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <AnimatePresence mode="wait">
        {activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-8 border-t border-border/10"
          >
            <div className="flex items-center gap-3 mb-8 px-4">
              <Settings2 className="text-accent" />
              <h2 className="text-2xl font-black tracking-tight">
                Editing: <span className="text-accent">{activeSection === 'user' ? 'User Database' : 'Book Collection'}</span>
              </h2>
            </div>
            <div className="bg-card/20 backdrop-blur-md rounded-3xl p-8 shadow-inner border border-white/5">
              {renderSectionContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
