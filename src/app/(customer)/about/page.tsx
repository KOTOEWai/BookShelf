import AboutContent from "./About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Book Shelf, our mission, and our team.',
};

export default function AboutPage() {
  return <AboutContent />;
}

