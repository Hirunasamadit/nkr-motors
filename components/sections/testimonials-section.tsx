import { TestimonialCard } from "@/components/cards/testimonial-card";
import { SectionHeader } from "@/components/ui/section-header";
import { testimonialsData } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section className="relative py-24 overflow-hidden theme-bg-hero">
      <div className="absolute inset-0 theme-bg-overlay-light"></div>
      <div className="absolute top-0 left-0 w-full h-1 theme-bg-component-1"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="TESTIMONIALS"
          title="What Our"
          titleAccent="Customers Say"
          description="Don't just take our word for it. Here's what our satisfied customers have to say about our services."
          gradientClass="theme-text-gradient-accent"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              stars={testimonial.stars}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              avatarInitials={testimonial.avatarInitials}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
