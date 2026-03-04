"use client"

import {
  BookOpen,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MessageCircle,
  Send,
  ArrowRight,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import logo from "@/public/book.jpg"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t bg-card/30 backdrop-blur-md border-border/50">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 -z-10 w-96 h-96 bg-accent/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container px-6 mx-auto lg:px-8">
        <div className="grid grid-cols-1 gap-16 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg ring-2 ring-accent/20">
                <Image src={logo} alt="BookShelf Logo" fill className="object-cover" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">
                Book<span className="text-accent">Shelf</span>
              </span>
            </Link>
            <p className="text-base leading-relaxed text-muted-foreground max-w-xs">
              Empowering readers across Myanmar with a curated digital library of timeless classics and modern masterpieces.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", color: "hover:bg-blue-500/10 hover:text-blue-500" },
                { icon: Twitter, href: "#", color: "hover:bg-sky-500/10 hover:text-sky-500" },
                { icon: Instagram, href: "#", color: "hover:bg-pink-500/10 hover:text-pink-500" },
                { icon: Send, href: "#", color: "hover:bg-blue-400/10 hover:text-blue-400" },
              ].map((social, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  className={`rounded-xl border-border/50 transition-all duration-300 ${social.color}`}
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-foreground">Navigation</h3>
            <ul className="space-y-4">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Premium Plans", href: "/pricing" },
                { label: "Book Library", href: "/books" },
                { label: "Saved Library", href: "/saveBooks" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm font-medium transition-colors text-muted-foreground hover:text-accent"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-foreground">Support</h3>
            <ul className="space-y-4">
              {[
                { label: "Help Center", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Contact Us", href: "#" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm font-medium transition-colors text-muted-foreground hover:text-accent"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-foreground">Join our Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest book releases and literary news delivered to your inbox.
            </p>
            <div className="flex flex-col gap-3">
              <div className="relative group">
                <Input
                  placeholder="Enter your email"
                  className="rounded-xl border-border/50 bg-background/50 pl-10 h-12 transition-all focus-visible:ring-accent/30"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
              </div>
              <Button className="w-full rounded-xl h-12 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 pt-12 border-t border-border/50 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-sm font-medium text-muted-foreground">
              © {currentYear} <span className="text-foreground font-bold">BookShelf</span>. Made with ❤️ in Myanmar.
            </p>
            <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]">
              Premium Digital Library Experience
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              { label: "Facebook", href: "#" },
              { label: "Telegram", href: "#" },
              { label: "Messenger", href: "#" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
              >
                {link.label}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
