"use client"

import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="py-12 border-t bg-background border-border">
      <div className="container px-4 mx-auto lg:px-8">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Literati</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your destination for discovering exceptional books and timeless stories.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-foreground">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-foreground">Follow Us</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-border md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Literati. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm transition-colors  text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
