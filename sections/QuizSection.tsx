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
    <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8 bg-page text-foreground relative">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="label-press mx-auto">
            <Award className="w-3.5 h-3.5" />
            <span>Trắc Nghiệm 30 Câu • Quiz Interactive</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight heading-display">
            KIỂM TRA KIẾN THỨC KINH TẾ CHÍNH TRỊ
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
                    ? "bg-[#9b1b1b] text-[#f4ebe0]"
                    : "bg-marx-raised text-muted-foreground hover:bg-[hsl(var(--muted))] hover:text-foreground border border-marx"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Quiz Board */}
        {!isQuizCompleted ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-marx-raised border border-marx shadow-2xl space-y-6">
            {/* Progress Top Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
                <span>
                  Câu hỏi <strong className="text-gold">{currentQuestionIndex + 1}</strong> / {filteredQuestions.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-[hsl(var(--muted))] text-gold font-mono text-[10px]">
                  {currentQ.category}
                </span>
                <span>
                  Điểm số: <strong className="text-emerald-400">{score}</strong>
                </span>
              </div>
              <div className="h-2 w-full bg-[hsl(var(--background))] rounded-full overflow-hidden border border-marx">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="pt-2">
              <h3 className="text-base sm:text-xl font-bold font-serif text-foreground leading-relaxed">
                {currentQuestionIndex + 1}. {currentQ.question}
              </h3>
            </div>

            {/* Answer Options Grid */}
            <div className="space-y-3">
              {currentQ.options.map((optionText, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswer;
                let optionStyle = "bg-[hsl(var(--background))] border-marx text-foreground/90 hover:bg-[hsl(var(--muted))] hover:border-marx";

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 font-semibold ring-1 ring-emerald-500";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "bg-red-950/80 border-red-500 text-red-100 ring-1 ring-red-500";
                  } else {
                    optionStyle = "bg-[hsl(var(--background))]/40 border-marx text-muted-foreground opacity-60";
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
                      <span className="w-6 h-6 rounded-sm bg-marx-raised text-muted-foreground text-xs font-mono font-bold flex items-center justify-center border border-marx shrink-0">
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
                  className="p-4 rounded-2xl bg-[hsl(var(--background))] border border-amber-500/40 space-y-2 text-xs sm:text-sm"
                >
                  <div className="font-bold text-gold flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Giải thích đáp án chuẩn KTCT:</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-sans">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Action Control */}
            <div className="flex justify-between items-center pt-4 border-t border-marx">
              <button
                onClick={handleRestartQuiz}
                className="px-4 py-2 rounded-xl bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] text-muted-foreground hover:text-foreground border border-marx text-xs font-semibold flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại từ đầu</span>
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={!isAnswerSubmitted}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all ${
                  isAnswerSubmitted
                    ? "bg-gradient-to-r from-red-600 to-amber-500 text-foreground shadow-lg hover:scale-105"
                    : "bg-[hsl(var(--muted))] text-muted-foreground cursor-not-allowed"
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
            className="p-8 sm:p-12 rounded-3xl bg-marx-raised border border-amber-500/80 shadow-2xl text-center space-y-6"
          >
            <div className="w-20 h-20 mx-auto rounded-sm bg-gradient-to-br from-red-600 via-amber-500 to-yellow-500 flex items-center justify-center text-foreground shadow-2xl">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-4xl font-bold font-serif text-foreground">
                HOÀN THÀNH BÀI TRẮC NGHIỆM!
              </h3>
              <p className="text-sm text-muted-foreground">
                Bạn đã hoàn thành bộ trắc nghiệm Kinh tế Chính trị Mác - Lênin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[hsl(var(--background))] border border-marx max-w-sm mx-auto space-y-2">
              <div className="text-xs text-muted-foreground font-mono">ĐIỂM SỐ ĐẠT ĐƯỢC</div>
              <div className="text-4xl font-black font-serif text-gold">
                {score} / {filteredQuestions.length}
              </div>
              <div className="text-xs font-bold text-emerald-400">
                Tỷ lệ chính xác: {Math.round((score / filteredQuestions.length) * 100)}%
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleRestartQuiz}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-foreground font-bold text-sm shadow-xl hover:scale-105 transition-transform inline-flex items-center space-x-2"
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
