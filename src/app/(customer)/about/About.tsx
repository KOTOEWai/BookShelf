"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Sparkles,
  Globe,
  Heart,
  Target,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { containerVariants, itemVariants } from "@/hooks/Variants";
import photo from "@/public/bookshelf1.jpg";
import readingBoy from "@/public/readingboy.jpg";

export default function AboutContent() {
  const values = [
    {
      title: "Our Mission",
      description: "To promote Burmese literature and make high-quality books accessible to every reader, anywhere.",
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Community First",
      description: "We believe in fostering a vibrant community of readers and authors to share knowledge and inspiration.",
      icon: Users,
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      title: "Lifelong Learning",
      description: "Our platform is dedicated to the continuous growth and development of our readers through curated content.",
      icon: Sparkles,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-10 max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <h2 className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full bg-accent/15 text-accent">
                Our Story
              </h2>
              <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
                Bridging Knowledge <br />
                <span className="text-accent">One Page at a Time</span>
              </h1>
              <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
                Welcome to <span className="font-bold text-primary">Book Shelf</span>. We're on a journey to transform how readers discover and engage with Burmese literature in the digital age.
              </p>
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <Button size="lg" className="rounded-full shadow-lg h-14 px-8">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="rounded-full h-14 px-8 hover:bg-primary/5 border-primary/20">
                  Explore Library
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10 overflow-hidden shadow-2xl rounded-3xl aspect-square lg:aspect-auto lg:h-[500px]">
                <Image
                  src={readingBoy}
                  alt="Reading Boy"
                  placeholder="blur"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 border-t border-border/50">
        <div className="container max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <div className="relative overflow-hidden shadow-xl rounded-3xl h-[450px]">
                <Image
                  src={photo}
                  alt="Beautiful Bookstore"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="order-1 space-y-8 lg:order-2">
              <div>
                <h3 className="mb-4 text-3xl font-bold text-foreground">Why We Exist</h3>
                <div className="w-12 h-1 mb-6 rounded-full bg-accent" />
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Whether you’re into literature, development, history, science, or poetry, our categorized collections offer something for every type of reader. We’re proud to support local authors and encourage a culture of reading in our community.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Curated collection of timeless Burmese classics",
                  "Support for contemporary local authors",
                  "Digital accessible reading experience",
                  "A growing community of 50K+ active readers"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-500">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-primary/5">
        <div className="container max-w-6xl px-4 mx-auto sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              What drives us to build the best digital library experience in Myanmar.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {values.map((value, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="h-full border-none shadow-lg transition-all duration-300 hover:-translate-y-2 bg-card/60 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center p-8">
                    <div className={`p-4 rounded-2xl mb-6 ${value.bg} ${value.color}`}>
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h4 className="mb-3 text-xl font-bold text-foreground">{value.title}</h4>
                    <p className="leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Counter (Simple) */}
      <section className="py-20 bg-background border-t border-border/50">
        <div className="container max-w-5xl px-4 mx-auto text-center">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Founded", value: "2024" },
              { label: "Active Readers", value: "50K+" },
              { label: "Books Archive", value: "10K+" },
              { label: "Local Authors", value: "200+" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="mb-2 text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm tracking-wide uppercase text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container max-w-4xl px-4 mx-auto text-center">
          <Card className="p-12 overflow-hidden border-none shadow-2xl bg-primary text-primary-foreground relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="relative z-10 flex flex-col items-center space-y-6">
              <Globe className="w-12 h-12 text-accent" />
              <h2 className="text-4xl font-bold">Join the Reading Revolution</h2>
              <p className="max-w-lg mx-auto text-xl opacity-90 leading-relaxed">
                Start your collection today and become part of our growing community.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" variant="secondary" className="px-10 h-14 rounded-full font-bold shadow-lg">
                  Sign Up Now
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
