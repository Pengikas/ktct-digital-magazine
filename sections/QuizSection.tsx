"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle, XCircle, RotateCcw, ArrowRight, Sparkles, HelpCircle, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/data/quizData";

export function QuizSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [score, setScore] = React.useState<number>(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = React.useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = React.useState<boolean>(false);
  const [userAnswers, setUserAnswers] = React.useState<{ [key: number]: number }>({});
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Tất cả");

  const filteredQuestions = React.useMemo(() => {
    if (selectedCategory === "Tất cả") return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQ = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / filteredQuestions.length) * 100);

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: index }));

    if (index === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      // Trigger confetti celebration on high score!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswerSubmitted(false);
    setIsQuizCompleted(false);
    setUserAnswers({});
  };

  return (
    <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 relative">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Trắc Nghiệm 30 Câu • Quiz Interactive</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            KIỂM TRA KIẾN THỨC KINH TẾ CHÍNH TRỊ
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Bộ 30 câu hỏi bám CQ5 (tích lũy tư bản, hình thức GTTD), nền tảng tiền–tư bản và số liệu thực tiễn.
          </p>
        </div>

        {/* Category Filters */}
        {!isQuizCompleted && (
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Tất cả",
              "Khái niệm",
              "Chức năng & Nguồn gốc",
              "Tư bản & Giá trị thặng dư",
              "Phân tích & Thực tiễn",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  handleRestartQuiz();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Quiz Board */}
        {!isQuizCompleted ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            {/* Progress Top Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>
                  Câu hỏi <strong className="text-amber-400">{currentQuestionIndex + 1}</strong> / {filteredQuestions.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[10px]">
                  {currentQ.category}
                </span>
                <span>
                  Điểm số: <strong className="text-emerald-400">{score}</strong>
                </span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="pt-2">
              <h3 className="text-base sm:text-xl font-bold font-serif text-white leading-relaxed">
                {currentQuestionIndex + 1}. {currentQ.question}
              </h3>
            </div>

            {/* Answer Options Grid */}
            <div className="space-y-3">
              {currentQ.options.map((optionText, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswer;
                let optionStyle = "bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700";

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 font-semibold ring-1 ring-emerald-500";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "bg-red-950/80 border-red-500 text-red-100 ring-1 ring-red-500";
                  } else {
                    optionStyle = "bg-slate-950/40 border-slate-900 text-slate-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between space-x-3 ${optionStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-slate-400 text-xs font-mono font-bold flex items-center justify-center border border-slate-800 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{optionText}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box on Answer Submitted */}
            <AnimatePresence>
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2 text-xs sm:text-sm"
                >
                  <div className="font-bold text-amber-400 flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Giải thích đáp án chuẩn KTCT:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Action Control */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={handleRestartQuiz}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-semibold flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại từ đầu</span>
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={!isAnswerSubmitted}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all ${
                  isAnswerSubmitted
                    ? "bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg hover:scale-105"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                <span>
                  {currentQuestionIndex < filteredQuestions.length - 1 ? "Câu tiếp theo" : "Xem kết quả hoàn thành"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion Summary Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-amber-500/80 shadow-2xl text-center space-y-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-2xl">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-4xl font-bold font-serif text-white">
                HOÀN THÀNH BÀI TRẮC NGHIỆM!
              </h3>
              <p className="text-sm text-slate-400">
                Bạn đã hoàn thành bộ trắc nghiệm Kinh tế Chính trị Mác - Lênin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto space-y-2">
              <div className="text-xs text-slate-400 font-mono">ĐIỂM SỐ ĐẠT ĐƯỢC</div>
              <div className="text-4xl font-black font-serif text-amber-400">
                {score} / {filteredQuestions.length}
              </div>
              <div className="text-xs font-bold text-emerald-400">
                Tỷ lệ chính xác: {Math.round((score / filteredQuestions.length) * 100)}%
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleRestartQuiz}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-sm shadow-xl hover:scale-105 transition-transform inline-flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Thực hiện lại bài kiểm tra</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
