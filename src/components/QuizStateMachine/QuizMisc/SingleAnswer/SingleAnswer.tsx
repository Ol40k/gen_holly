import { useMemo } from 'react';

import { useQuizStateMachine } from '../../QuizStateMachineContext';
import { AnswerData } from '../../QuizStateMachine.interfaces';

import Female from '../../../../assets/emoji/female.png';
import Male from '../../../../assets/emoji/male.png';
import Wink from '../../../../assets/emoji/wink.png';

import './SingleAnswer.scss';

export const SingleAnswer: React.FC<{
  answer: AnswerData;
  variant: 'single' | 'single-row';
}> = ({ answer }) => {
  const { currentStepData } = useQuizStateMachine();
  const variantToClassNameMap = useMemo<Record<string, string>>(
    () => ({
      single: 'single-answer--single',
      'single-row': 'single-answer--single-row',
    }),
    []
  );
  const iconToNameMap = useMemo<Record<string, string>>(
    () => ({
      female: Female,
      male: Male,
      wink: Wink,
    }),
    []
  );

  return (
    <button
      className={[
        'single-answer',
        variantToClassNameMap[currentStepData.selectionType],
      ].join(' ')}
      onClick={() => currentStepData.answerAction(answer)}
    >
      {answer?.icon && (
        <img
          width={52}
          height={52}
          src={iconToNameMap[answer.icon]}
          alt={answer.name}
        />
      )}
      {answer.name}
    </button>
  );
};
