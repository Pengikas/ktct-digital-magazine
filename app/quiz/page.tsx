"use client";

import { QuizSection } from "@/sections/QuizSection";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function QuizPage() {
  return (
    <PageTransition>
      <div className="pt-6">
        <QuizSection />
      </div>
      <PageNavigation />
    </PageTransition>
  );
}
