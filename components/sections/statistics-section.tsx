import { StatsCard } from "@/components/cards/stats-card";
import { statisticsData } from "@/lib/constants";

export function StatisticsSection() {
  return (
    <section className="relative py-20 -mt-16 overflow-hidden theme-bg-primary">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {statisticsData.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              title={stat.title}
              description={stat.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
