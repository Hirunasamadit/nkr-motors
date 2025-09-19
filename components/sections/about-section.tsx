import { BRAND, aboutCardsData, whyChooseUsData } from "@/lib/constants";
import { AboutCard } from "@/components/cards/about-card";
import { WhyChooseUsItem } from "@/components/cards/why-choose-us-item";
import { SectionHeader } from "@/components/ui/section-header";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden theme-bg-hero"
    >
      <div className="absolute inset-0 theme-bg-overlay-light"></div>
      <div className="absolute top-0 left-0 w-full h-1 theme-bg-component-1"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={`ABOUT ${BRAND.NAME}`}
          title="Your Trusted"
          titleAccent="Auto Service Partner"
          description={`With over 15 years of experience in automotive service and repair, ${BRAND.NAME} has built a reputation for excellence, reliability, and customer satisfaction.`}
          gradientClass="theme-text-gradient-accent"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {aboutCardsData.map((card, index) => (
              <AboutCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                iconThemeClass={card.iconThemeClass}
              />
            ))}
          </div>

          <div className="space-y-8">
            <div className="backdrop-blur-md p-8 theme-shadow-card border border-[var(--primary-50)]">
              <h3 className="text-3xl font-industrial text-white mb-6">
                Our Mission
              </h3>
              <p className="text-[var(--dark-300)] leading-relaxed text-lg mb-6">
                To provide exceptional automotive service that keeps you safe
                on the road while building lasting relationships with our
                customers through honesty, integrity, and quality workmanship.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group">
                  <div className="text-4xl font-black mb-2 text-[var(--primary-600)] group-hover:text-[var(--primary-300)] transition-colors duration-300 ease-out">
                    5000+
                  </div>
                  <div className="text-[var(--dark-300)] text-sm group-hover:text-[var(--dark-200)] transition-colors duration-300 ease-out">
                    Cars Serviced
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black mb-2 text-[var(--primary-600)] group-hover:text-[var(--primary-300)] transition-colors duration-300 ease-out">
                    98%
                  </div>
                  <div className="text-[var(--dark-300)] text-sm group-hover:text-[var(--dark-200)] transition-colors duration-300 ease-out">
                    Customer Satisfaction
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/10 border border-white/20 backdrop-blur-md theme-shadow-card">
              <h3 className="text-2xl font-industrial text-white mb-6">
                Why Choose {BRAND.NAME}?
              </h3>
              <ul className="space-y-4">
                {whyChooseUsData.map((item, index) => (
                  <WhyChooseUsItem key={index} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
