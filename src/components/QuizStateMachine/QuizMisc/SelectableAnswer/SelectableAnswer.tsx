import { useId, useMemo } from 'react';

import { useQuizStateMachine } from '../../QuizStateMachineContext';

import { SelectableAnswerProps } from './SelectableAnswer.interfaces';

import Werewolf from '../../../../assets/emoji/werewolf.png';
import Dancing from '../../../../assets/emoji/dancing.png';
import Crown from '../../../../assets/emoji/crown.png';
import Money from '../../../../assets/emoji/money.png';
import Romance from '../../../../assets/emoji/romance.png';
import Adult from '../../../../assets/emoji/adult.png';
import Cowboy from '../../../../assets/emoji/cowboy.png';

import './SelectableAnswer.scss';

export const SelectableAnswer: React.FC<SelectableAnswerProps> = ({
  answer,
  variant,
}) => {
  const checkboxId = useId();
  const { currentStepData } = useQuizStateMachine();

  const variantToClassNameMap = useMemo(
    () => ({
      multiple: 'selectable-answer--multiple',
      'multiple-bubble': 'selectable-answer--multiple-bubble',
    }),
    []
  );

  const iconToNameMap = useMemo<Record<string, string>>(
    () => ({
      werewolf: Werewolf,
      action: Dancing,
      royalObsession: Crown,
      billionaire: Money,
      romance: Romance,
      youngAdult: Adult,
      badBoy: Cowboy,
    }),
    []
  );

  const handleSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      currentStepData.answerAction(answer);
    } else {
      currentStepData.answerAction(answer, { removeSelectedAnswer: true });
    }
  };

  return (
    <div>
      <input
        id={checkboxId}
        className="selectable-answer__input"
        type="checkbox"
        onChange={handleSelectionChange}
      />
      <label
        htmlFor={checkboxId}
        className={`selectable-answer ${variantToClassNameMap[variant]}`}
      >
        {answer?.icon && (
          <img
            width={23.5}
            height={25}
            src={iconToNameMap[answer.icon]}
            alt={answer.name}
          />
        )}
        <span>{answer.name}</span>
      </label>
    </div>
  );
};
