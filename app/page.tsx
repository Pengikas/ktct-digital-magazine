"use client";

import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { TeamSection } from "@/sections/TeamSection";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <AboutSection />
      <TeamSection />
    </div>
  );
}
