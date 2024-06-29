import { useQuizStateMachine } from '../QuizStateMachine/QuizStateMachineContext';

import './StepTitle.scss';

export const StepTitle: React.FC = () => {
  const { currentStepData } = useQuizStateMachine();

  return (
    <>
      <h1 className="step-title">{currentStepData.question}</h1>
      {currentStepData?.answersExplanation && (
        <h3 className="secondary-text">{currentStepData.answersExplanation}</h3>
      )}
    </>
  );
};
