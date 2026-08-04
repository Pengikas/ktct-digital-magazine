"use client";

import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { TheorySection } from "@/sections/TheorySection";
import { AnalysisSection } from "@/sections/AnalysisSection";
import { PracticalSection } from "@/sections/PracticalSection";
import { StatisticsSection } from "@/sections/StatisticsSection";
import { KnowledgeMapSection } from "@/sections/KnowledgeMapSection";
import { QASection } from "@/sections/QASection";
import { QuizSection } from "@/sections/QuizSection";
import { TeamSection } from "@/sections/TeamSection";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <AboutSection />
      <TheorySection />
      <AnalysisSection />
      <PracticalSection />
      <StatisticsSection />
      <KnowledgeMapSection />
      <QASection />
      <QuizSection />
      <TeamSection />
    </div>
  );
}
