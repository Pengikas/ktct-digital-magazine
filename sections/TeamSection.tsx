"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, Sparkles, Award, GraduationCap, ShieldCheck } from "lucide-react";
import { TEAM_MEMBERS, PROJECT_INFO, TeamMember } from "@/data/teamData";

export function TeamSection() {
  const [activeDept, setActiveDept] = React.useState<string>("Tất cả");

  const filteredMembers = TEAM_MEMBERS.filter((member) => {
    if (activeDept === "Tất cả") return true;
    return member.department === activeDept;
  });

  return (
    <section id="team" className="scroll-mt-28 py-20 px-4 sm:px-6 lg:px-8 bg-page text-foreground relative border-t border-marx">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="label-press mx-auto">
            <Users className="w-3.5 h-3.5" />
            <span>Đội Ngũ Thực Hiện • Project Team</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight heading-display">
            THÀNH VIÊN NHÓM ĐỒ ÁN KTCT
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Danh sách 20 sinh viên Trường Đại học Công nghệ Thông tin (UIT) tham gia nghiên cứu, biên tập nội dung, thiết kế UI/UX và phát triển website Digital Magazine.
          </p>
        </div>

        {/* Project Info Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[hsl(var(--background))] border border-purple-900/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">
              {PROJECT_INFO.course} • {PROJECT_INFO.academicYear}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-foreground">
              {PROJECT_INFO.title}
            </h3>
            <p className="text-xs text-muted-foreground max-w-2xl">
              {PROJECT_INFO.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-2xl bg-purple-950 text-purple-300 border border-purple-800 text-center">
              <GraduationCap className="w-6 h-6 mx-auto" />
              <span className="text-[11px] font-bold mt-1 block">UIT Student Team</span>
            </div>
            <div className="p-3 rounded-2xl bg-red-950 text-red-300 border border-red-800 text-center">
              <Award className="w-6 h-6 mx-auto" />
              <span className="text-[11px] font-bold mt-1 block">20 Members</span>
            </div>
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Tất cả",
            "Lãnh đạo",
            "Thiết kế & UI/UX",
            "Phát triển Phần mềm",
            "Nội dung & Nghiên cứu",
            "Thuyết trình & Game",
          ].map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeDept === dept
                  ? "bg-purple-600 text-foreground shadow-lg shadow-purple-600/30"
                  : "bg-[hsl(var(--background))] text-muted-foreground hover:bg-[hsl(var(--muted))] hover:text-foreground border border-marx"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="p-5 rounded-2xl bg-[hsl(var(--background))] border border-marx hover:border-purple-500/60 transition-all shadow-xl space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Avatar & Badge */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500 text-foreground font-black text-sm flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
                    {member.avatarInitials}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-base font-bold text-foreground group-hover:text-purple-400 transition-colors truncate font-serif">
                      {member.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-gold block truncate">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-muted-foreground leading-relaxed font-sans line-clamp-3 bg-marx-raised p-2.5 rounded-lg border border-marx">
                  {member.bio}
                </p>
              </div>

              {/* Skill Tags */}
              <div className="pt-2 border-t border-marx flex flex-wrap gap-1">
                {member.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded text-[10px] bg-marx-raised text-muted-foreground border border-marx font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
