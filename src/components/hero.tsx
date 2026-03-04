"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { containerVariants, itemVariants } from "@/hooks/Variants"
import { useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section ref={targetRef} className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full -top-24 -right-24 w-[500px] h-[500px] bg-accent/20 blur-[120px]"
          animate={{
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full -bottom-48 -left-48 w-[600px] h-[600px] bg-primary/10 blur-[130px]"
          animate={{
            y: [0, -120, 0],
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating shapes */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 border border-accent/20 rounded-2xl hidden md:block"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-6 py-2 text-sm font-bold uppercase tracking-widest rounded-full bg-accent/15 text-accent shadow-sm border border-accent/10">
            <Sparkles className="w-4 h-4" />
            Discover Amazing Stories
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-8 text-6xl font-extrabold leading-[1.1] sm:text-8xl tracking-tight text-foreground"
        >
          Your Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Great Read</span> Awaits
        </motion.h1>

        <motion.p variants={itemVariants} className="max-w-2xl mx-auto mb-12 text-xl leading-relaxed text-muted-foreground/80 md:text-2xl">
          Dive into carefully curated collections of timeless classics, contemporary bestsellers, and hidden gems. Join thousands of readers discovering their favorite stories.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-full shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105 group">
            Explore Now
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 px-10 text-lg font-bold rounded-full border-2 border-primary/20 hover:bg-primary/5 transition-all"
          >
            Learn More
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid max-w-3xl grid-cols-3 gap-8 mx-auto mt-24 pt-12 border-t border-border/50">
          {[
            { label: "Books Available", value: "10K+" },
            { label: "Active Readers", value: "50K+" },
            { label: "Average Rating", value: "4.8★" }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="mb-2 text-3xl font-bold transition-colors text-accent group-hover:text-primary md:text-5xl">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
