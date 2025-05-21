// src/components/questionnaire/index.tsx
import React, {useCallback, useEffect, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { Question } from './Question';
import { ProgressBar } from './ProgressBar';
import { Summary } from './Summary';
import { Button } from '../ui/Button';

export const Questionnaire: React.FC = () => {
    const {
        questions,
        currentQuestionIndex,
        isQuestionVisible,
        isSubmitted,
        goToNextQuestion,
        goToPreviousQuestion,
        isLastQuestion,
        submitQuestionnaire,
        hasError
    } = useQuestionnaire();

    const [showSummary, setShowSummary] = useState(false);
    const [showValidation, setShowValidation] = useState(false);

    const handleNextClick = useCallback(() => {
        if (hasError()) {
            setShowValidation(true);
        } else {
            goToNextQuestion();
            setShowValidation(false);
        }
    }, [goToNextQuestion, hasError]);

    const handlePreviousClick = useCallback(() => {
        goToPreviousQuestion();
        setShowValidation(false);
    },[goToPreviousQuestion]);

    const handleSubmitClick = () => {
        if (hasError()) {
            setShowValidation(true);
        } else {
            submitQuestionnaire();
        }
    };
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleNextClick();
            }
            if (event.key === "Escape") {
                handlePreviousClick();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleNextClick, handlePreviousClick]);
    if (isSubmitted) {
        return (
            <motion.div
                className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-2xl font-bold text-center mb-6 text-green-600"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    پرسشنامه با موفقیت ثبت شد!
                </motion.h1>
                <Summary />
            </motion.div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <motion.div
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            <motion.h1
                className="text-2xl font-bold text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                پرسشنامه
            </motion.h1>

            <ProgressBar />

            <AnimatePresence mode="wait">
                {isQuestionVisible(currentQuestion.id) && (
                    <Question
                        key={currentQuestion.id}
                        question={currentQuestion}
                        showValidation={showValidation}
                    />
                )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
                <Button
                    onClick={handlePreviousClick}
                    variant="secondary"
                >
                    قبلی
                </Button>

                {isLastQuestion() ? (
                    <Button
                        onClick={handleSubmitClick}
                        variant="success"

                    >
                        ثبت
                    </Button>
                ) : (
                    <Button
                        onClick={handleNextClick}
                        variant="primary"
                    >
                        بعدی
                    </Button>
                )}
            </div>
            <div className="text-xs mt-6 text-center">
                میتونید با کلید های enter و escape عقب و جلو کنید
            </div>
            <div className="mt-6 text-center">
                <Button
                    onClick={() => setShowSummary(!showSummary)}
                    variant="secondary"
                    className="text-sm"
                >
                    {showSummary ? 'مخفی کردن خلاصه' : 'نمایش خلاصه پاسخ‌ها'}
                </Button>
            </div>

            <AnimatePresence>
                {showSummary && <Summary />}
            </AnimatePresence>
        </motion.div>
    );
};