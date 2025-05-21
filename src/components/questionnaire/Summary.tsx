import React from 'react';
import { motion } from 'framer-motion';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { summaryItemVariants } from '../../utils/animations';

export const Summary: React.FC = () => {
    const { questions, isQuestionVisible } = useQuestionnaire();


    return (
        <motion.div
            className="mt-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold text-center mb-4">خلاصه پاسخ‌ها</h2>
            <div className="space-y-4">
                {questions.map((q, index) => (
                    isQuestionVisible(q.id) && (
                        <motion.div
                            key={q.id}
                            className="p-4 bg-gray-50 rounded-md shadow-sm"
                            variants={summaryItemVariants}
                            initial="initial"
                            animate="animate"
                            custom={index}
                        >
                            <p className="font-medium text-right">{q.text}</p>
                            {q.type === 'text' && (
                                <p className="text-gray-700 mt-2 text-right">
                                    {q.answer as string || 'بدون پاسخ'}
                                </p>
                            )}
                            {q.type === 'radio' && q.options && (
                                <p className="text-gray-700 mt-2 text-right">
                                    {q.answer !== undefined ? q.options[q.answer as number] : 'بدون پاسخ'}
                                </p>
                            )}
                        </motion.div>
                    )
                ))}
            </div>
        </motion.div>
    );
};