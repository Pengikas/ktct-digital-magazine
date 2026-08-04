"use client";

import * as React from "react";
import { Search, X, BookOpen, Layers, Award, BarChart, HelpCircle, Users, ArrowRight } from "lucide-react";
import { CORE_CONCEPTS, MONEY_FUNCTIONS, VALUE_FORMS } from "@/data/theoryData";
import { CENTRAL_QUESTION_ANALYSIS, COUNTER_ARGUMENTS } from "@/data/analysisData";
import { PRACTICAL_EXAMPLES } from "@/data/practicalExamplesData";
import { QA_ITEMS } from "@/data/qaData";
import { TEAM_MEMBERS } from "@/data/teamData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (targetId: string) => void;
}

export function SearchModal({ isOpen, onClose, onSelectResult }: SearchModalProps) {
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search logic across all sections
  const matchedConcepts = cleanQuery
    ? CORE_CONCEPTS.filter(
        (c) =>
          c.title.toLowerCase().includes(cleanQuery) ||
          c.originalTerm.toLowerCase().includes(cleanQuery) ||
          c.definition.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedFunctions = cleanQuery
    ? MONEY_FUNCTIONS.filter(
        (f) =>
          f.title.toLowerCase().includes(cleanQuery) ||
          f.definition.toLowerCase().includes(cleanQuery) ||
          f.example.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedValueForms = cleanQuery
    ? VALUE_FORMS.filter(
        (vf) =>
          vf.title.toLowerCase().includes(cleanQuery) ||
          vf.formula.toLowerCase().includes(cleanQuery) ||
          vf.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedAnalysis = cleanQuery
    ? CENTRAL_QUESTION_ANALYSIS.filter(
        (a) =>
          a.title.toLowerCase().includes(cleanQuery) ||
          a.subtitle.toLowerCase().includes(cleanQuery) ||
          a.summary.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedPracticals = cleanQuery
    ? PRACTICAL_EXAMPLES.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanQuery) ||
          p.subject.toLowerCase().includes(cleanQuery) ||
          p.fact.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedQA = cleanQuery
    ? QA_ITEMS.filter(
        (q) =>
          q.question.toLowerCase().includes(cleanQuery) ||
          q.fullAnswer.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedTeam = cleanQuery
    ? TEAM_MEMBERS.filter(
        (tm) =>
          tm.name.toLowerCase().includes(cleanQuery) ||
          tm.role.toLowerCase().includes(cleanQuery) ||
          tm.skills.some((s) => s.toLowerCase().includes(cleanQuery))
      )
    : [];

  const totalResults =
    matchedConcepts.length +
    matchedFunctions.length +
    matchedValueForms.length +
    matchedAnalysis.length +
    matchedPracticals.length +
    matchedQA.length +
    matchedTeam.length;

  const handleItemClick = (id: string) => {
    onSelectResult(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-md transition-all">
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-amber-500 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm khái niệm, chức năng tiền, bài phân tích, case study, Q&A, tác giả..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Search Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!cleanQuery && (
            <div className="text-center py-10 space-y-3">
              <BookOpen className="w-12 h-12 mx-auto text-amber-500/50" />
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Nhập từ khóa bất kỳ để tìm kiếm nhanh nội dung trong Tạp chí Kinh tế Chính trị.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {["Thặng dư", "Thước đo giá trị", "Bill Gates", "H-T-H", "Hạnh phúc", "Tái sản xuất"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs hover:bg-amber-500 hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {cleanQuery && totalResults === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Không tìm thấy kết quả nào phù hợp với &quot;{query}&quot;.
              </p>
            </div>
          )}

          {/* Concepts */}
          {matchedConcepts.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                <BookOpen className="w-4 h-4 mr-1.5" /> Khái niệm Lý thuyết ({matchedConcepts.length})
              </div>
              <div className="space-y-1.5">
                {matchedConcepts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(`concept-${item.id}`)}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200/60 dark:border-slate-800 cursor-pointer group transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {item.title} <span className="text-xs text-slate-400 font-normal">({item.originalTerm})</span>
                      </h4>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Functions */}
          {matchedFunctions.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                <Layers className="w-4 h-4 mr-1.5" /> Chức năng Tiền tệ ({matchedFunctions.length})
              </div>
              <div className="space-y-1.5">
                {matchedFunctions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick("money-functions")}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-red-50 dark:hover:bg-red-950/30 border border-slate-200/60 dark:border-slate-800 cursor-pointer group transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400">
                        Chức năng {item.number}: {item.title}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
                        {item.keyBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis */}
          {matchedAnalysis.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                <BarChart className="w-4 h-4 mr-1.5" /> Phân tích Chuyên sâu ({matchedAnalysis.length})
              </div>
              <div className="space-y-1.5">
                {matchedAnalysis.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(`analysis-${item.id}`)}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200/60 dark:border-slate-800 cursor-pointer group transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600">
                      {item.sectionNumber}. {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Case Studies */}
          {matchedPracticals.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                <Award className="w-4 h-4 mr-1.5" /> Case Studies Thực tế ({matchedPracticals.length})
              </div>
              <div className="space-y-1.5">
                {matchedPracticals.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(`practical-${item.id}`)}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/60 dark:border-slate-800 cursor-pointer group transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                      {item.fact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QA Items */}
          {matchedQA.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                <HelpCircle className="w-4 h-4 mr-1.5" /> Hỏi Đáp & Phản Biện ({matchedQA.length})
              </div>
              <div className="space-y-1.5">
                {matchedQA.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick("qa-section")}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border border-slate-200/60 dark:border-slate-800 cursor-pointer group transition-colors"
                  >
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600">
                      {item.questionNumber}: {item.question}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                      {item.shortAnswer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team */}
          {matchedTeam.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                <Users className="w-4 h-4 mr-1.5" /> Thành viên Nhóm Đồ án ({matchedTeam.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedTeam.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick("team-section")}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-slate-200/60 dark:border-slate-800 cursor-pointer group transition-colors flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
                      {item.avatarInitials}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-purple-600">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          Tìm thấy <span className="font-semibold text-amber-500">{totalResults}</span> kết quả phù hợp cho &quot;{query}&quot;
        </div>
      </div>
    </div>
  );
}
