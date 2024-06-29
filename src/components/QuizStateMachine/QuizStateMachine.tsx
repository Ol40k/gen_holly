import { ProgressBar } from '../ProgressBar/ProgressBar';
import { StepTitle } from '../StepTitle/StepTitle';

import { QuizStateMachineProvider } from './QuizStateMachineContext';
import { ListOfAnswers } from './QuizMisc/ListOfAnswers/ListOfAnswers';

import './QuizStateMachine.scss';

export const QuizStateMachine: React.FC = () => {
  return (
    <QuizStateMachineProvider>
      <div className="quiz__wrapper">
        <ProgressBar />
        <StepTitle />
        <ListOfAnswers />
      </div>
    </QuizStateMachineProvider>
  );
};
