"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { containerVariants, itemVariants } from "@/hooks/Variants"

export function Hero() {

  


  return (
    <section className="relative flex items-center justify-center pt-5 overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute rounded-full top-20 right-10 w-96 h-96 bg-accent/20 blur-3xl"
        animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full bottom-20 left-10 w-96 h-96 bg-primary/10 blur-3xl"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-accent/15 text-accent">
            ✨ Discover Amazing Stories
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-bold leading-tight sm:text-7xl text-foreground"
        >
          Your Next <span className="text-accent">Great Read</span> Awaits
        </motion.h1>

        <motion.p variants={itemVariants} className="max-w-2xl mx-auto mb-8 text-xl text-muted-foreground">
          Dive into carefully curated collections of timeless classics, contemporary bestsellers, and hidden gems. Join
          thousands of readers discovering their favorite stories.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="px-8 py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90">
            Explore Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-base bg-transparent border-2 border-primary text-primary hover:bg-primary/5"
          >
            Learn More
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid max-w-2xl grid-cols-3 gap-8 mx-auto mt-16">
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-accent">10K+</div>
            <div className="text-sm text-muted-foreground">Books Available</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-accent">50K+</div>
            <div className="text-sm text-muted-foreground">Active Readers</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-accent">4.8★</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
