"use client"

import { motion } from "framer-motion"
import {
    Zap,
    Crown,
    Infinity as InfinityIcon,
    Users,
    ShieldCheck,
    Rocket,
    Sparkles
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const benefits = [
    {
        icon: Zap,
        title: "Offline Access",
        description: "Download your favorite books and read them anytime, anywhere—even without an internet connection.",
        color: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-blue-500"
    },
    {
        icon: Crown,
        title: "Premium Collection",
        description: "Gain access to a curated selection of world-class literature and exclusive digital editions.",
        color: "from-amber-500/20 to-orange-500/20",
        iconColor: "text-amber-500"
    },
    {
        icon: InfinityIcon,
        title: "Smart Sync",
        description: "Seamlessly transition between your phone, tablet, and desktop with real-time progress syncing.",
        color: "from-purple-500/20 to-pink-500/20",
        iconColor: "text-purple-500"
    },
    {
        icon: Users,
        title: "Global Community",
        description: "Join a vibrant community of readers to share reviews, insights, and literary discoveries.",
        color: "from-green-500/20 to-emerald-500/20",
        iconColor: "text-green-500"
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
}

export function BenefitsSection() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-[radial-gradient(circle_at_center,var(--accent-foreground)_0%,transparent_70%)] opacity-[0.03]" />

            <div className="container px-6 mx-auto lg:px-8">
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Badge variant="outline" className="px-4 py-1 mb-6 border-accent/20 bg-accent/5 text-accent font-bold uppercase tracking-widest text-[10px]">
                            <Sparkles className="w-3 h-3 mr-2" />
                            The BookShelf Advantage
                        </Badge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6"
                    >
                        Why Choose Our <span className="text-accent">Platform?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="max-w-2xl text-lg text-muted-foreground"
                    >
                        We've built more than just a library. We've created a premium reading experience tailored for modern book enthusiasts.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {benefits.map((benefit, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="group relative h-full border-none bg-card/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-card/60">
                                {/* Gradient Glow */}
                                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-3xl`} />

                                <CardContent className="p-8 flex flex-col items-center text-center">
                                    <div className={`mb-6 p-4 rounded-2xl bg-background/50 shadow-inner ring-1 ring-white/10 ${benefit.iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                        <benefit.icon className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                                        {benefit.title}
                                    </h3>

                                    <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                                        {benefit.description}
                                    </p>

                                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-accent">
                                            Learn More <Rocket className="w-3 h-3 ml-1" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
