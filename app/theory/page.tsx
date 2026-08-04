"use client";

import { TheorySection } from "@/sections/TheorySection";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function TheoryPage() {
  return (
    <PageTransition>
      <div className="pt-6">
        <TheorySection />
      </div>
      <PageNavigation />
    </PageTransition>
  );
}
