"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  BookOpen,
  Heart,
  Award,
  Settings,
  Mail,
  Bookmark,
  Edit3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { containerVariants, itemVariants } from "@/hooks/Variants";
import ReadingGoal from "@/components/ReadingGoal";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/fetchUser/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [session?.user?.id]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const user = session?.user;

  const stats = [
    {
      label: "Books Read",
      value: userData?.booksRead || "0",
      icon: BookOpen,
      color: "text-blue-500"
    },
    { label: "Wishlist", value: "12", icon: Heart, color: "text-rose-500" },
    { label: "Achievements", value: userData?.booksRead >= userData?.readingGoal && userData?.readingGoal > 0 ? "🏆" : "8", icon: Award, color: "text-amber-500" },
  ];

  return (
    <div className="min-h-screen pb-20 bg-background/50">
      {/* Banner / Header Background */}
      <div className="relative h-64 overflow-hidden bg-primary/10">
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-3xl opacity-30 animate-pulse"></div>
        </motion.div>
      </div>

      <div className="max-w-5xl px-4 mx-auto -mt-32 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main Profile Info */}
          <Card className="overflow-hidden border-none shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-8">
                <motion.div variants={itemVariants} className="relative group">
                  <Avatar className="w-32 h-32 border-4 shadow-xl border-background sm:w-40 sm:h-40">
                    <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                    <AvatarFallback className="text-4xl bg-muted text-muted-foreground">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  <motion.div variants={itemVariants}>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {user?.name || "Bibliophile"}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-muted-foreground md:justify-start">
                      <span className="flex items-center gap-1.5 text-sm">
                        <Mail className="w-4 h-4" />
                        {user?.email}
                      </span>
                      <Separator orientation="vertical" className="hidden h-4 md:block" />
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                        {user?.role || "Member"}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mt-6 md:justify-start">
                    <Button className="gap-2 rounded-full bg-primary hover:bg-primary/90">
                      <Settings className="w-4 h-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="gap-2 rounded-full border-primary/20 hover:bg-primary/5" asChild>
                      <Link href="/saveBooks">
                        <Bookmark className="w-4 h-4" />
                        Saved Library
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="transition-all hover:shadow-lg border-primary/10 border-t-4 bg-card/50 overflow-hidden group">
                  <CardContent className="flex items-center gap-4 p-6 relative">
                    <div className={`p-4 rounded-2xl bg-muted/20 ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                      <stat.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      <h3 className="text-3xl font-black text-foreground tabular-nums">{stat.value}</h3>
                    </div>
                    <div className="absolute -bottom-2 -right-2 opacity-5 scale-150 rotate-12">
                      <stat.icon className="w-16 h-16" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Reading Goal Section */}
          <motion.div variants={itemVariants}>
            {user?.id && (
              <ReadingGoal
                userId={user.id}
                initialGoal={userData?.readingGoal || 0}
                initialRead={userData?.booksRead || 0}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
