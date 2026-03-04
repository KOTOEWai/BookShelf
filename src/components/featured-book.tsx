"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star, MessageCircle, Crown, ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface FeaturedBookProps {
    book: {
        _id: string
        BookName: string
        Author: string
        Price: number
        Image: string
        Description: string
        Rating: number
        reviewCount?: number
        BookLink: string
    } | null
}

export function FeaturedBook({ book }: FeaturedBookProps) {
    if (!book) return null;

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 -z-10 w-full h-full bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
            <div className="absolute -top-24 -right-24 -z-10 w-96 h-96 bg-accent/10 blur-[100px] rounded-full" />

            <div className="container px-6 mx-auto lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-16 text-center"
                >
                    <Badge variant="outline" className="px-4 py-1 mb-4 border-accent/20 bg-accent/5 text-accent font-bold uppercase tracking-widest text-[10px]">
                        <Crown className="w-3 h-3 mr-2" />
                        Most Reviewed Masterpiece
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
                        Reader's Choice <span className="text-accent underline decoration-accent/20 underline-offset-8">Highlight</span>
                    </h2>
                    <p className="max-w-2xl text-lg text-muted-foreground">
                        Discover the most discussed and celebrated literary work in our entire collection, as voted by our community.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="relative group flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                            <Image
                                src={book.Image}
                                alt={book.BookName}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < Math.round(book.Rating) ? "fill-current" : ""}`} />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-white/80">{book.Rating} / 5.0</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1 line-clamp-1">{book.BookName}</h3>
                                <p className="text-sm font-medium text-white/60">by {book.Author}</p>
                            </div>
                        </div>

                        {/* Draggable indicator or decoration */}
                        <div className="absolute -top-6 -left-6 bg-card/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent/20 rounded-lg text-accent">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Community Reviews</p>
                                    <p className="text-lg font-black text-foreground">{book.reviewCount ?? 124}+ Posts</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col space-y-8"
                    >
                        <div className="space-y-4">
                            <Badge className="bg-accent/10 text-accent border-none rounded-full px-4 h-7 text-[10px] font-black uppercase tracking-widest">
                                Trending #1
                            </Badge>
                            <h3 className="text-4xl font-black text-foreground leading-[1.1]">
                                {book.BookName}
                            </h3>
                            <p className="text-xl font-medium text-accent">
                                {book.Author}
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {book.Description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-accent/5 border border-accent/10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Pricing</p>
                                <p className="text-2xl font-black text-foreground">{book.Price.toLocaleString()} Ks</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Engagement</p>
                                <div className="flex items-center gap-1.5 text-accent">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span className="text-2xl font-black">{book.Rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="rounded-xl h-14 px-8 font-black gap-2 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto" asChild>
                                <Link href={book.BookLink}>
                                    <ShoppingCart className="w-5 h-5" />
                                    Read Sample Now
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-xl h-14 px-8 font-black gap-2 border-border/50 hover:bg-accent/5 w-full sm:w-auto">
                                Discover More
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
