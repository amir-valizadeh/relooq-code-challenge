// src/components/questionnaire/Question.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { Question as QuestionType } from '../../types';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { Input } from '../ui/Input';
import { RadioGroup } from '../ui/RadioGroup';
import { questionVariants, formElementVariants } from '../../utils/animations';

interface QuestionProps {
    question: QuestionType;
    showValidation: boolean; // New prop to control validation display
}

export const Question: React.FC<QuestionProps> = ({ question, showValidation }) => {
    const { setAnswer } = useQuestionnaire();

    const handleTextChange = (value: string) => {
        setAnswer(question.id, value);
    };

    const handleRadioChange = (index: number) => {
        setAnswer(question.id, index);
    };

    // Determine if we should show errors - only if showValidation is true and the field is empty
    const showTextError = showValidation &&
        question.required &&
        (!question.answer || (typeof question.answer === 'string' && question.answer.trim() === ''));

    const showRadioError = showValidation &&
        question.required &&
        question.answer === undefined;

    return (
        <motion.div
            className="mb-6 min-h-40"
            variants={questionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {question.type === 'text' && (
                <motion.div
                    variants={formElementVariants}
                    initial="initial"
                    animate="animate"
                    custom={0}
                >
                    <Input
                        label={question.text}
                        value={question.answer as string || ''}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder="پاسخ خود را اینجا وارد کنید"
                        required={question.required}
                        error={showTextError ? 'این فیلد الزامی است' : undefined}
                    />
                </motion.div>
            )}

            {question.type === 'radio' && question.options && (
                <motion.div
                    variants={formElementVariants}
                    initial="initial"
                    animate="animate"
                    custom={0}
                >
                    <RadioGroup
                        label={question.text}
                        options={question.options}
                        name={`question-${question.id}`}
                        value={question.answer as number}
                        onChange={handleRadioChange}
                        required={question.required}
                        error={showRadioError ? 'لطفاً یک گزینه را انتخاب کنید' : undefined}
                    />
                </motion.div>
            )}
        </motion.div>
    );
};