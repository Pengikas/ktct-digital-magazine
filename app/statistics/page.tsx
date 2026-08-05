"use client";

import { StatisticsSection } from "@/sections/StatisticsSection";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function StatisticsPage() {
  return (
    <PageTransition>
      <div className="pt-6">
        <StatisticsSection />
      </div>
      <PageNavigation />
    </PageTransition>
  );
}
