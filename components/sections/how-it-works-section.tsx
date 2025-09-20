import { StepCard } from "@/components/cards/step-card";
import { SectionHeader } from "@/components/ui/section-header";
import { stepsData } from "@/lib/constants";
import { AnimatedContent, StaggeredContainer, StaggeredItem } from "@/lib/animations";

export function HowItWorksSection() {
  return (
    <section className="relative py-24 overflow-hidden theme-bg-section">
      <div className="absolute inset-0 theme-bg-overlay-light"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent delay={0.2}>
          <SectionHeader
            badge="HOW IT WORKS"
            title="How to"
            titleAccent="Service Your Car"
            description="Rather than letting your services go by, take these steps to keep your car in good shape until you can afford a full service."
          />
        </AnimatedContent>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-4 gap-8 relative items-stretch" staggerDelay={0.15}>
          {stepsData.map((step, index) => (
            <StaggeredItem key={index}>
              <StepCard
                title={step.title}
                description={step.description}
                stepNumber={index + 1}
              />
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  );
}
