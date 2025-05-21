// src/components/questionnaire/ProgressBar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { progressVariants } from '../../utils/animations';

export const ProgressBar: React.FC = () => {
    const { getProgress, visibleQuestions } = useQuestionnaire();

    // محاسبه تعداد سوالات قابل نمایش
    const visibleQuestionsCount = visibleQuestions.length;

    // محاسبه شماره فعلی برای نمایش
    const currentStep = Math.ceil(getProgress() * visibleQuestionsCount);

    return (
        <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    variants={progressVariants}
                    initial="initial"
                    animate="animate"
                    custom={getProgress()}
                />
            </div>
            <motion.p
                className="text-center mt-2 text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                سوال {currentStep} از {visibleQuestionsCount}
            </motion.p>
        </div>
    );
};