// src/context/QuestionnaireContext.tsx
import React, { createContext, type ReactNode, useState, useEffect } from 'react';
import type {Question} from '../types';
import { initialQuestions, conditions } from '../data/questionsData';
import { calculateVisibleQuestions } from '../utils/conditionalLogic';

// تعریف ساختار context
interface QuestionnaireContextType {
    questions: Question[];
    currentQuestionIndex: number;
    visibleQuestions: number[];
    setAnswer: (questionId: number, answer: string | number) => void;
    goToNextQuestion: () => void;
    goToPreviousQuestion: () => void;
    goToQuestion: (index: number) => void;
    isQuestionVisible: (questionId: number) => boolean;
    getProgress: () => number;
    isLastQuestion: () => boolean;
    hasError: () => boolean|undefined;
    getAnswers: () => Record<number, string | number | undefined>;
    submitQuestionnaire: () => void;
    isSubmitted: boolean;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

interface QuestionnaireProviderProps {
    children: ReactNode;
}

export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({ children }) => {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [visibleQuestions, setVisibleQuestions] = useState<number[]>([]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const visibleQuestionsIds = calculateVisibleQuestions(questions, conditions);
        setVisibleQuestions(visibleQuestionsIds);
    }, [questions]);

    const setAnswer = (questionId: number, answer: string | number) => {
        const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, answer } : q
        );
        setQuestions(updatedQuestions);
    };

    const goToNextQuestion = () => {
        const visibleIndices = questions
            .map((q, index) => ({ id: q.id, index }))
            .filter(item => visibleQuestions.includes(item.id))
            .map(item => item.index);

        const currentVisibleIndex = visibleIndices.indexOf(currentQuestionIndex);

        if (currentVisibleIndex < visibleIndices.length - 1) {
            setCurrentQuestionIndex(visibleIndices[currentVisibleIndex + 1]);
        }
    };

    const goToPreviousQuestion = () => {
        const visibleIndices = questions
            .map((q, index) => ({ id: q.id, index }))
            .filter(item => visibleQuestions.includes(item.id))
            .map(item => item.index);

        const currentVisibleIndex = visibleIndices.indexOf(currentQuestionIndex);

        if (currentVisibleIndex > 0) {
            setCurrentQuestionIndex(visibleIndices[currentVisibleIndex - 1]);
        }
    };
    const goToQuestion = (index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentQuestionIndex(index);
        }
    };

    const isQuestionVisible = (questionId: number) => {
        return visibleQuestions.includes(questionId);
    };

    const getProgress = () => {
        const visibleIndices = questions
            .map((q, index) => ({ id: q.id, index }))
            .filter(item => visibleQuestions.includes(item.id))
            .map(item => item.index);

        const currentVisibleIndex = visibleIndices.indexOf(currentQuestionIndex);

        return (currentVisibleIndex + 1) / visibleIndices.length;
    };

    const isLastQuestion = () => {
        const visibleIndices = questions
            .map((q, index) => ({ id: q.id, index }))
            .filter(item => visibleQuestions.includes(item.id))
            .map(item => item.index);

        const currentVisibleIndex = visibleIndices.indexOf(currentQuestionIndex);

        return currentVisibleIndex === visibleIndices.length - 1;
    };

    const hasError = () => {
        const currentQuestion = questions[currentQuestionIndex];
        return currentQuestion.required &&
            (currentQuestion.answer === undefined ||
                (typeof currentQuestion.answer === 'string' && currentQuestion.answer.trim() === ''));
    };

    const getAnswers = () => {
        const answers: Record<number, string | number | undefined> = {};
        questions.forEach(q => {
            if (visibleQuestions.includes(q.id)) {
                answers[q.id] = q.answer;
            }
        });
        return answers;
    };

    const submitQuestionnaire = () => {
        setIsSubmitted(true);
        console.log('Questionnaire submitted with answers:', getAnswers());
        // در اینجا می‌توانید کد ارسال اطلاعات به سرور را اضافه کنید
        alert('پرسشنامه با موفقیت ثبت شد!');
    };

    const value: QuestionnaireContextType = {
        questions,
        currentQuestionIndex,
        visibleQuestions,
        setAnswer,
        goToNextQuestion,
        goToPreviousQuestion,
        goToQuestion,
        isQuestionVisible,
        getProgress,
        isLastQuestion,
        hasError,
        getAnswers,
        submitQuestionnaire,
        isSubmitted,
    };

    return (
        <QuestionnaireContext.Provider value={value}>
            {children}
        </QuestionnaireContext.Provider>
    );
};