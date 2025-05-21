// src/hooks/useQuestionnaire.ts
import { useContext } from 'react';
import { QuestionnaireContext } from '../context/QuestionnaireContext';

/**
 * هوک سفارشی برای دسترسی به context پرسشنامه
 * @returns مقادیر و توابع مربوط به پرسشنامه
 */
export const useQuestionnaire = () => {
    const context = useContext(QuestionnaireContext);

    if (!context) {
        throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
    }

    return context;
};