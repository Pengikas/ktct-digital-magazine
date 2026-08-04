"use client";

import { AboutSection } from "@/sections/AboutSection";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-6">
        <AboutSection />
      </div>
      <PageNavigation />
    </PageTransition>
  );
}
