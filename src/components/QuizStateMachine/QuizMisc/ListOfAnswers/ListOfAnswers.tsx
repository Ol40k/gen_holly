import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useQuizStateMachine } from '../../QuizStateMachineContext';
import { SingleAnswer } from '../SingleAnswer/SingleAnswer';
import { SelectableAnswer } from '../SelectableAnswer/SelectableAnswer';
import { Button } from '../../../Button/Button';
import { AnswerData } from '../../QuizStateMachine.interfaces';

import './ListOfAnswers.scss';

export const ListOfAnswers: React.FC = () => {
  const { currentStepData, currentStepSelection, goToNextStep } =
    useQuizStateMachine();
  const { t } = useTranslation();
  const selectionTypeToListStyleMap = useMemo(
    () => ({
      single: 'list-of-answers--single',
      'single-row': 'list-of-answers--single-row',
      multiple: 'list-of-answers--multiple',
      'multiple-bubble': 'list-of-answers--multiple-bubble',
    }),
    []
  );

  const prepareDataForBubbles = (data: AnswerData[]) => {
    const columnsCount = Math.ceil(data.length / 2);

    const result = [];
    let resultIndex = 0;
    for (let index = 0; resultIndex < columnsCount; index += 2) {
      result[resultIndex] = [data[index], data[index + 1]];
      if (!result[resultIndex][1]) {
        result[resultIndex].pop();
      }
      resultIndex++;
    }
    return result;
  };

  return (
    <>
      <ul
        className={`list-of-answers ${
          selectionTypeToListStyleMap[currentStepData.selectionType]
        }`}
      >
        {currentStepData.selectionType === 'single' &&
          currentStepData.data.map((answer) => (
            <li key={answer.value}>
              <SingleAnswer variant="single" answer={answer} />
            </li>
          ))}
        {currentStepData.selectionType === 'single-row' &&
          currentStepData.data.map((answer) => (
            <li key={answer.value}>
              <SingleAnswer variant="single-row" answer={answer} />
            </li>
          ))}
        {currentStepData.selectionType === 'multiple' &&
          currentStepData.data.map((answer) => (
            <li key={answer.value}>
              <SelectableAnswer variant="multiple" answer={answer} />
            </li>
          ))}
        {currentStepData.selectionType === 'multiple-bubble' &&
          prepareDataForBubbles(currentStepData.data).map((answers, index) => {
            return (
              <li key={index}>
                <ul className="list-of-answers--nested">
                  {answers.map((answer) => {
                    return (
                      <li key={answer.value}>
                        <SelectableAnswer
                          variant="multiple-bubble"
                          answer={answer}
                        />
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
      {(currentStepData.selectionType === 'multiple' ||
        currentStepData.selectionType === 'multiple-bubble') && (
        <Button
          disabled={currentStepSelection.length === 0}
          onClick={goToNextStep}
        >
          {t('next')}
        </Button>
      )}
    </>
  );
};
