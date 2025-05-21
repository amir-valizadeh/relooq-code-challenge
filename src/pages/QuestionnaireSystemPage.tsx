// src/pages/QuestionnaireSystemPage.tsx
import React from 'react';
import { QuestionnaireProvider } from '../context/QuestionnaireContext';
import { Questionnaire } from '../components/questionnaire';

const QuestionnaireSystemPage: React.FC = () => {
    return (
        <div className="vazirmatn min-h-screen bg-gray-100 p-4 flex items-center justify-center" dir="rtl">
            <QuestionnaireProvider>
                <Questionnaire />
            </QuestionnaireProvider>
        </div>
    );
};

export default QuestionnaireSystemPage;