"use client";

import { TheorySection } from "@/sections/TheorySection";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function NenTangPage() {
  return (
    <PageTransition>
      <div className="pt-2">
        <TheorySection />
      </div>
      <PageNavigation />
    </PageTransition>
  );
}
