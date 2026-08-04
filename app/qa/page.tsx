"use client";

import { QASection } from "@/sections/QASection";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function QAPage() {
  return (
    <PageTransition>
      <div className="pt-6">
        <QASection />
      </div>
      <PageNavigation />
    </PageTransition>
  );
}
