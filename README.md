# 📚 BookShelf - The Premium Digital Library & Community

[![Next.js 15+](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![Database-MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)
[![Style-Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![License-MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**BookShelf** is a high-performance, aesthetically premium digital library platform designed for both bibliophiles and administrators. Built with **Next.js 15**, it offers a seamless experience for discovering, reading, and tracking literary goals within a modern, animated ecosystem. ✨💎

---

## ✨ Key Features

### 🌟 For Readers (Customer Experience)
- **Cinematic Discovery**: An immersive landing page with dynamic hero sections and curated book collections.
- **Reading Goal Tracker 🏆**: Set personal reading goals, track progress with visual bars, and earn achievement trophies as you reach your milestones.
- **Personal Library**: Save your favorite books to your personal collection for quick access.
- **Smart Search & Filters**: Quickly find books by name, author, or category (including specialized Burmese categories like ဝတ္ထု, သုတ, သမိုင်း).
- **Interactive Reviews**: Share your thoughts and rate books with a clean star-rating system.
- **Seamless Downloads**: Download high-quality PDF versions of your favorite books directly to your device.

### 🛡️ For Administrators (Management Portal)
- **Glassmorphism Dashboard**: A state-of-the-art management interface featuring real-time statistics and a cinematic activity feed.
- **Advanced Book Management**: Complete CRUD operations for books, supporting simultaneous Cloudinary uploads for both high-resolution covers and PDF files.
- **User Analytics**: Monitor member growth and role management.
- **Automated Seeding**: Built-in scripts to quickly populate the database with high-quality example data.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) - React 19 Support.
- **Design & UI**: 
  - [Tailwind CSS 4](https://tailwindcss.com/) - Modern utility-first styling.
  - [Framer Motion](https://www.framer.com/motion/) - Smooth cinematic transitions & micro-animations.
  - [Lucide React](https://lucide.dev/) - Consistent and premium iconography.
  - [Shadcn UI](https://ui.shadcn.com/) - High-quality accessible components.
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) - Supporting Google OAuth & Email/Password credentials.
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for elegant object modeling.
- **Cloud Infrastructure**: [Cloudinary](https://cloudinary.com/) - Robust image and document delivery.
- **Utilities**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [React Toastify](https://fkhadra.github.io/react-toastify/).

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js 18+](https://nodejs.org/)
- [MongoDB URI](https://www.mongodb.com/atlas/database)
- [Cloudinary Account](https://cloudinary.com/)

### 2. Environment Setup
Create a `.env` file in the root directory and configure the following variables:

```env
# Database
MongoUrl='your_mongodb_connection_string'

# Authentication
NEXTAUTH_SECRET='your_secret'
NEXT_PUBLIC_BASE_URL='http://localhost:3000'
GOOGLE_CLIENT_ID='your_google_id'
GOOGLE_CLIENT_SECRET='your_google_secret'

# Cloudinary
CLOUDINARY_CLOUD_NAME='your_cloud_name'
CLOUDINARY_API_KEY='your_api_key'
CLOUDINARY_API_SECRET='your_api_secret'
```

### 3. Installation & Run
```bash
# Clone the repository
git clone https://github.com/your-username/BookShelf.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the premium experience.

---

## 📸 Screenshots & Showcase

> [!TIP]
> Check out the `walkthrough.md` in the brain artifacts for detailed implementation details and feature breakdowns.

---

## 📜 License
Independent project developed with a focus on modern web standards and visual excellence. Distributed under the MIT License.

---

Made with ❤️ for the BookShelf Community. 📚✨💎
