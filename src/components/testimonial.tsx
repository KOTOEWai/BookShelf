"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Quote, Star } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: " Sarah Johnson",
    role: "Avid Reader",
    content: "BookShelf completely transformed how I discover new books. The curated collections are always spot-on and inspiring!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Michael Chen",
    role: "Literature Teacher",
    content: "Perfect for my students. The variety and quality of recommendations help everyone find their next favorite read effortlessly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Emma Roberts",
    role: "Book Blogger",
    content: "The community here is amazing. Love sharing reviews and discovering what other readers are truly passionate about.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
  },
]

export function TestimonialSection() {
  return (
    <section id="reviews" className="relative px-4 py-32 overflow-hidden sm:px-6 lg:px-8 bg-background">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest rounded-full bg-accent/15 text-accent">
            Wall of Love
          </h2>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
            Loved by <span className="text-accent">Thousands</span> of Readers
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-xl text-muted-foreground">
            See what our community members are saying about their personal reading journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex h-full"
            >
              <Card className="relative flex flex-col h-full p-8 border-none shadow-2xl bg-card/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 group">
                <div className="absolute top-6 right-8 text-accent/80 transition-transform group-hover:scale-110 group-hover:text-accent/20">
                  <Quote className="w-12 h-12" />
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                    />
                  ))}
                </div>

                <p className="relative z-10 flex-1 mb-8 text-lg leading-relaxed text-foreground/80 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                  <Avatar className="w-12 h-12 border-2 border-background shadow-lg">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
