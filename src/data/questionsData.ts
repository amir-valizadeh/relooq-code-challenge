import type {Question, Condition} from '../types';

export const initialQuestions: Question[] = [
    {
        id: 1,
        type: 'text',
        text: 'نام خود را وارد کنید:',
        required: true,
    },
    {
        id: 2,
        type: 'radio',
        text: 'جنسیت:(با انتخاب گزینه سه میتونی سوال چهار رو جواب بدی)',
        options: ['مرد', 'زن', 'ترجیح می‌دهم نگویم'],
        required: true,
    },
    {
        id: 3,
        type: 'text',
        text: 'سن خود را وارد کنید:',
        required: true,
    },
    {
        id: 4,
        type: 'radio',
        text: 'وضعیت تحصیلی:',
        options: ['دیپلم', 'کارشناسی', 'کارشناسی ارشد', 'دکترا'],
        required: true,
    },
    {
        id: 5,
        type: 'radio',
        text: 'آیا در حال حاضر شاغل هستید؟',
        options: ['بله', 'خیر'],
        required: true,
    },
    {
        id: 6,
        type: 'text',
        text: 'نام محل کار:',
        required: false,
    },
    {
        id: 7,
        type: 'radio',
        text: 'سابقه کار:',
        options: ['کمتر از ۱ سال', '۱ تا ۳ سال', '۳ تا ۵ سال', 'بیشتر از ۵ سال'],
        required: false,
    },
];

export const conditions: Condition[] = [
    {
        questionId: 2,
        answers: [0, 1],
        hide: [4],
    },
    {
        questionId: 5,
        answers: [1],
        hide: [6, 7],
    },
];