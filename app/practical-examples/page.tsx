"use client";

import { PracticalSection } from "@/sections/PracticalSection";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function PracticalExamplesPage() {
  return (
    <PageTransition>
      <div className="pt-6">
        <PracticalSection />
      </div>
      <PageNavigation />
    </PageTransition>
  );
}
