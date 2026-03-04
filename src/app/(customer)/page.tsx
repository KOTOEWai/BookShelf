import Category from "@/components/category"
import { Hero } from "@/components/hero";
import { TestimonialSection } from "@/components/testimonial";
import { FeaturedBook } from "@/components/featured-book";
import { getMostReviewedBook } from "@/actions/get-featured-book";
import { BenefitsSection } from "@/components/features";

export default async function Home() {
  const featuredBook = await getMostReviewedBook();

  return (
    <main>
      <Hero />
      <FeaturedBook book={featuredBook} />
      <BenefitsSection />
      <Category />
      <TestimonialSection />
    </main>
  );
}
