import { TipCard } from "@/components/cards/tip-card";
import { SectionHeader } from "@/components/ui/section-header";
import { tipsData } from "@/lib/constants";
import Marquee from "react-fast-marquee";

export function TipsSection() {
  return (
    <section className="relative py-24 overflow-hidden theme-bg-section">
      <div className="absolute inset-0 theme-bg-overlay-light"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="EXPERT TIPS"
          title="Auto"
          titleAccent="Maintenance Tips"
          description="Keep your vehicle in top condition with these essential maintenance tips from our expert technicians."
        />
      </div>

      {/* Full width marquee container */}
      <div className="w-full">
        <Marquee
          speed={100}
          gradient={false}
          pauseOnHover={true}
          className="py-4"
        >
          {tipsData.map((tip, index) => (
            <div key={index} className="flex-shrink-0 w-[32rem] mx-3">
              <TipCard
                icon={tip.icon}
                category={tip.category}
                title={tip.title}
                description={tip.description}
                index={index}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
