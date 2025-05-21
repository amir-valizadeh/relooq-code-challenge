
import type {Question, Condition} from '../types';

export const calculateVisibleQuestions = (
    questions: Question[],
    conditions: Condition[]
): number[] => {
    const visibleQuestionsIds = questions.map(q => q.id);

    conditions.forEach(condition => {
        const conditionQuestion = questions.find(q => q.id === condition.questionId);

        if (conditionQuestion && conditionQuestion.answer !== undefined) {
            if (condition.answers.includes(conditionQuestion.answer)) {
                condition.hide.forEach(hideId => {
                    const index = visibleQuestionsIds.indexOf(hideId);
                    if (index !== -1) {
                        visibleQuestionsIds.splice(index, 1);
                    }
                });
            }
        }
    });

    return visibleQuestionsIds;
};

