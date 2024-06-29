export interface AnswerData {
  value: string;
  name: string;
  icon?: string;
}

type AnswerAction = (
  answer: AnswerData,
  options?: {
    removeSelectedAnswer?: boolean;
  }
) => void;

export interface QuizStep {
  question: string | React.ReactNode;
  answersExplanation?: string;
  selectionType: 'single' | 'single-row' | 'multiple' | 'multiple-bubble';
  data: AnswerData[];
  alternative?: {
    reason: {
      key: LocalStorageKeys;
      hasValue: string;
    };
    question: string | React.ReactNode;
    data: AnswerData[];
  };
  nextStepIndex: number | null;
  previousStepIndex: number | null;
  answerAction: AnswerAction;
}

export interface QuizStateMachineContextData {
  currentStepData: QuizStep;
  currentStepNumber: number;
  questionsNumber: number;
  currentStepSelection: AnswerData[];
  goToNextStep: () => void;
  goPreviousStep: () => void;
}

export interface AnswerDataToSave extends AnswerData {
  order: number;
  type: 'single-select' | 'single-select-image' | 'multiple' | 'bubble';
  question: string;
}

export type LocalStorageKeys =
  | 'language'
  | 'genderIdentity'
  | 'age'
  | 'hateTheMost'
  | 'favoriteTopics';

export type MultipleSelectionHandler = (
  answer: AnswerData,
  options: {
    removeSelectedAnswer?: boolean;
    key: LocalStorageKeys;
    saveOptions: Omit<AnswerDataToSave, 'value' | 'name' | 'icon'>;
  }
) => void;
