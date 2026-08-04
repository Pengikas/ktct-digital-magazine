"use client";

import { AnalysisSection } from "@/sections/AnalysisSection";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function AnalysisPage() {
  return (
    <PageTransition>
      <div className="pt-6">
        <AnalysisSection />
      </div>
      <PageNavigation />
    </PageTransition>
  );
}
