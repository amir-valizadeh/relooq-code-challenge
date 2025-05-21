
export type QuestionType = 'text' | 'radio';

export interface Question {
    id: number;
    type: QuestionType;
    text: string;
    options?: string[];
    answer?: string | number;
    required?: boolean;
}

export interface Condition {
    questionId: number;
    answers: (string | number)[];
    hide: number[];
}