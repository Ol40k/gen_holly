import { AnswerData } from '../../QuizStateMachine.interfaces';

// TODO
export interface SelectableAnswerProps {
  answer: AnswerData;
  variant: 'multiple' | 'multiple-bubble';
}
