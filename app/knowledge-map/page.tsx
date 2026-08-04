"use client";

import { KnowledgeMapSection } from "@/sections/KnowledgeMapSection";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function KnowledgeMapPage() {
  return (
    <PageTransition>
      <div className="pt-6">
        <KnowledgeMapSection />
      </div>
      <PageNavigation />
    </PageTransition>
  );
}
