### [deployed app](https://relooq-code-challenge.vercel.app/)
#### [similar project that I have worked on](https://htd.medicinskoptik.se/)

# Questionnaire Technical Documentation

### Folder Structure

```
src/
├── components/
│   ├── questionnaire/
│   │   ├── Navigation.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Question.tsx
│   │   ├── Summary.tsx
│   │   └── index.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── RadioGroup.tsx
├── context/
│   └── QuestionnaireContext.tsx
├── hooks/
│   └── useQuestionnaire.ts
├── types/
│   └── index.ts
├── utils/
│   ├── animations/
│   │   └── index.ts
│   └── conditionalLogic.ts
├── data/
│   └── questionsData.ts
├── pages/
│   └── QuestionnaireSystemPage.tsx
└── App.tsx
```

## Data Flow and Workflow

The following diagram illustrates the data flow and component interactions in the Questionnaire System:

```
┌───────────────────────┐           ┌───────────────────────┐
│                       │           │                       │
│  questionsData.ts     │◄──────────┤  conditionalLogic.ts  │
│ (Question Definitions)│           │  (Visibility Rules)   │
│                       │           │                       │
└──────────┬────────────┘           └───────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│                                                          │
│             QuestionnaireContext.tsx                     │
│             (State Management)                           │
│                                                          │
│  ┌─────────────────────────────────────────────────┐     │
│  │ State:                                          │     │
│  │ - questions                                     │     │
│  │ - currentQuestionIndex                          │     │
│  │ - visibleQuestions                              │     │
│  │ - isSubmitted                                   │     │
│  └─────────────────────────────────────────────────┘     │
│                                                          │
│  ┌─────────────────────────────────────────────────┐     │
│  │ Functions:                                      │     │
│  │ - setAnswer                                     │     │
│  │ - goToNextQuestion                              │     │
│  │ - goToPreviousQuestion                          │     │
│  │ - isQuestionVisible                             │     │
│  │ - hasError                                      │     │
│  │ - submitQuestionnaire                           │     │
│  └─────────────────────────────────────────────────┘     │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           │   ┌───────────────────────┐
                           │   │                       │
                           │   │  useQuestionnaire.ts  │
                           │   │  (Custom Hook)        │
                           │   │                       │
                           │   └───────────┬───────────┘
                           │               │
                           ▼               ▼
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                Questionnaire/index.tsx                   │
│                (Main Component)                          │
│                                                          │
│  ┌─────────────────────────────────────────────────┐     │
│  │ Local State:                                    │     │
│  │ - showSummary                                   │     │
│  │ - showValidation                                │     │
│  └─────────────────────────────────────────────────┘     │
│                                                          │
│  ┌─────────────────────────────────────────────────┐     │
│  │ Event Handlers:                                 │     │
│  │ - handleNextClick                               │     │
│  │ - handlePreviousClick                           │     │
│  │ - handleSubmitClick                             │     │
│  └─────────────────────────────────────────────────┘     │
│                                                          │
└───────┬────────────────┬─────────────────┬───────────────┘
        │                │                 │
        ▼                ▼                 ▼
┌───────────────┐ ┌──────────────┐ ┌──────────────┐
│               │ │              │ │              │
│  Question.tsx │ │ ProgressBar  │ │   Summary    │
│               │ │              │ │              │
└───────┬───────┘ └──────────────┘ └──────────────┘
        │
        ▼
┌───────────────┐
│    UI         │
│  Components   │
└───────────────┘
```

## Logical Flow

1. **Initialization**:
    - The system loads question definitions from `questionsData.ts`.
    - `QuestionnaireContext` initializes the state and provides functions for manipulation.
    - All questions are analyzed to determine initial visibility based on conditional logic.

2. **Question Rendering**:
    - The main Questionnaire component renders the current question based on `currentQuestionIndex`.
    - Only one question is shown at a time.
    - Question component receives the current question data and validation state as props.

3. **User Interaction**:
    - When a user answers a question, the `setAnswer` function updates the answer in the context.
    - When conditional logic applies, the `visibleQuestions` array is updated.
    - Navigation buttons allow users to move between questions.

4. **Validation**:
    - Validation is triggered when the user attempts to navigate to the next question or submit.
    - If the current question has validation errors, the system displays error messages and prevents navigation.
    - The `showValidation` state controls when error messages are displayed.

5. **Submission**:
    - When the user reaches the last question and clicks "Submit", all answers are validated.
    - If valid, the form is submitted and a success message is shown with a summary of answers.
    - If not valid, error messages are displayed for the current question.

## Key Technical Features

### State Management
The application uses React Context API for state management, which provides:
- Centralized storage for questionnaire data

### Conditional Questions
The system supports conditional logic for showing/hiding questions based on previous answers:
- Each condition consists of a question ID, trigger answers, and questions to hide
- The visibility is recalculated whenever answers change

### Validation
The validation system:
- Validates required fields only when the user attempts to navigate or submit
- Shows error messages only after the first navigation attempt
- Clears validation state when moving to different questions

### Animation
Framer Motion provides smooth transitions for:
- Question transitions (slide in/out)
- Progress bar updates
- Form elements (fade in)
- Submit confirmation

## Technical Debt

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                     TECHNICAL DEBT                          │
│                                                             │
├────────────────────┬────────────────────┬───────────────────┤
│                    │                    │                   │
│   E2E Testing      │  Dynamic Validation│  Documentation    │
│   Priority: HIGH   │  Priority: MEDIUM  │  Priority: MEDIUM │
│                    │                    │                   │
└────────────────────┴────────────────────┴───────────────────┘
```

### E2E Testing
**Missing component testing and end-to-end test coverage**

- Implement Cypress test suite
- Create test flows for all user paths
- Test conditional logic and validation

### Dynamic Validation
**Current validation is limited to required fields only**

- Add schema-based validation system
- Support email, numeric, pattern validation
- Add real-time validation feedback



## Accessibility

- Keyboard navigation
- Required field labeling
- Error state identification


Additional accessibility improvements:
- Implement proper ARIA attributes
- Improve focus management
- Ensure proper heading structure
- Add screen reader instructions
