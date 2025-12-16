"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Avid Reader",
    content: "BookVerse completely transformed how I discover new books. The curated collections are always spot-on!",
    rating: 5,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZX52N3Yx3rEzNwTCRy9fqG3-pAIFWSPVnA5lwN4xJiH5X-MMzhPDKuo6buPPgwfPl9ig&usqp=CAU",
  },
  {
    name: "Michael Chen",
    role: "Literature Teacher",
    content:
      "Perfect for my students. The variety and quality of recommendations help everyone find their next favorite.",
    rating: 5,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSysuH2GKY1GUkq8yRb9tQWYm5X6sm_xpodgx_TZtaSq5NseLDtVeUbi9R6uiGXz0SlJu4&usqp=CAU",
  },
  {
    name: "Emma Roberts",
    role: "Book Blogger",
    content:
      "The community here is amazing. Love sharing reviews and discovering what other readers are passionate about.",
    rating: 4,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2fJQvsQbaAdxj-55UbsjqHEo9XwTS-dQsHicw1-WfEIgDMfUnGWMrph-5lD9let1XpkY&usqp=CAU",
  },
]

export function TestimonialSection() {
  return (
    <section id="reviews" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl text-foreground">Loved by Readers</h2>
          <p className="text-lg text-muted-foreground">
            See what our community members are saying about their reading experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="flex flex-col h-full p-8 border-2 border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="flex-1 mb-6 text-foreground">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="object-cover w-12 h-12 rounded-full "
                  />
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
