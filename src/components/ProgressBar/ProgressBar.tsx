import { useTranslation } from 'react-i18next';

import { useQuizStateMachine } from '../QuizStateMachine/QuizStateMachineContext';

import ChevronLeft from '../../assets/arrows/chevronLeft.svg';

import './ProgressBar.scss';

export const ProgressBar: React.FC = () => {
  const {
    currentStepNumber,
    questionsNumber,
    goPreviousStep,
    currentStepData,
  } = useQuizStateMachine();
  const { t } = useTranslation();

  // <progress> wasn't used because it doesn't stable across browsers
  return (
    <div className="progress-bar">
      {currentStepData.previousStepIndex !== null && (
        <button className="progress-bar__go-back-btn" onClick={goPreviousStep}>
          <img width={6.5} height={13} src={ChevronLeft} alt={t('arrowLeft')} />
        </button>
      )}
      <data
        className="progress-bar__data"
        value={t('stepOf', { currentStepNumber, questionsNumber })}
      >
        <span className="highlight">{currentStepNumber}</span>&nbsp;/&nbsp;
        {questionsNumber}
      </data>
      <div
        className="progress-bar__value"
        style={{ width: `${(currentStepNumber / questionsNumber) * 100}%` }}
      ></div>
      <div className="progress-bar__track"></div>
    </div>
  );
};
