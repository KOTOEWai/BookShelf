"use client";

import { motion } from "framer-motion";
import { Check, X, Zap, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { containerVariants, itemVariants } from "@/hooks/Variants";

const pricingPlans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for casual readers starting their journey.",
        features: [
            { text: "Save up to 10 books", included: true },
            { text: "Basic book analytics", included: true },
            { text: "Community access", included: true },
            { text: "Offline reading", included: false },
            { text: "Advanced AI recommendations", included: false },
        ],
        icon: Zap,
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "$9.99",
        description: "The ultimate collection for avid bibliophiles.",
        features: [
            { text: "Unlimited saved books", included: true },
            { text: "Advanced reading analytics", included: true },
            { text: "Priority community support", included: true },
            { text: "Offline reading mode", included: true },
            { text: "AI-powered recommendations", included: true },
        ],
        icon: Sparkles,
        cta: "Go Pro",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$29.99",
        description: "For institutions and large reading clubs.",
        features: [
            { text: "Unlimited saved books", included: true },
            { text: "Multi-user management", included: true },
            { text: "Custom API access", included: true },
            { text: "Personalized reading coach", included: true },
            { text: "Bulk book imports", included: true },
        ],
        icon: Building2,
        cta: "Contact Sales",
        popular: false,
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen py-20 bg-background/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Pricing Plans</h2>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                        Choose Your <span className="text-accent">Reading Experience</span>
                    </h1>
                    <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Find the perfect plan to help you organize your reading life and discover your next favorite book.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {pricingPlans.map((plan, index) => (
                        <motion.div key={index} variants={itemVariants} className="flex h-full">
                            <Card
                                className={`relative flex flex-col h-full border-none shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden ${plan.popular ? "ring-2 ring-accent bg-card/90" : "bg-card/60"
                                    } backdrop-blur-sm`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0">
                                        <div className="bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest px-8 py-1 rotate-45 translate-x-[26px] translate-y-[10px] shadow-lg">
                                            Popular
                                        </div>
                                    </div>
                                )}

                                <CardHeader className="p-8 pb-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${plan.popular ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                                        }`}>
                                        <plan.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                    <div className="mt-4 flex items-baseline gap-1">
                                        <span className="text-4xl font-bold tracking-tight text-foreground">{plan.price}</span>
                                        <span className="text-sm font-medium text-muted-foreground">/month</span>
                                    </div>
                                    <p className="mt-4 text-sm text-muted-foreground min-h-[40px] leading-relaxed">
                                        {plan.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="p-8 pt-6 flex-grow">
                                    <div className="space-y-4">
                                        {plan.features.map((feature, fIndex) => (
                                            <div key={fIndex} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <div className="mt-1 p-0.5 rounded-full bg-green-500/10 text-green-500">
                                                        <Check className="w-3.5 h-3.5" />
                                                    </div>
                                                ) : (
                                                    <div className="mt-1 p-0.5 rounded-full bg-muted text-muted-foreground/40">
                                                        <X className="w-3.5 h-3.5" />
                                                    </div>
                                                )}
                                                <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter className="p-8 pt-0">
                                    <Button
                                        className={`w-full py-6 rounded-xl font-bold transition-all ${plan.popular
                                            ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                                            : "variant-outline border-primary/20 hover:text-primary hover:bg-primary/5"
                                            }`}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* FAQ/Simple Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <p className="text-muted-foreground">
                        All plans include a 14-day free trial. No credit card required.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-6">
                        <button className="text-sm font-medium text-accent hover:underline">Support</button>
                        <button className="text-sm font-medium text-accent hover:underline">Term of Service</button>
                        <button className="text-sm font-medium text-accent hover:underline">Privacy Policy</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
