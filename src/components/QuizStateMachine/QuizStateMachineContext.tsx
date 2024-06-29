import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
  AnswerData,
  AnswerDataToSave,
  LocalStorageKeys,
  MultipleSelectionHandler,
  QuizStateMachineContextData,
  QuizStep,
} from './QuizStateMachine.interfaces';

const QuizStateMachineContext =
  createContext<null | QuizStateMachineContextData>(null);

export const QuizStateMachineProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepSelection, setCurrentStepSelection] = useState<
    AnswerData[]
  >([]);

  const languageMap = useMemo<Record<string, string>>(
    () => ({ english: 'en', french: 'fr', german: 'de', spanish: 'es' }),
    []
  );

  const goToNextStep = useCallback(() => {
    const currentStepData = completeQuizPath[currentStep];

    if (currentStepData.nextStepIndex === null) {
      // finishing quiz
      navigate('/email', { replace: true });
      return;
    }

    if (
      typeof currentStepData.nextStepIndex === 'number' &&
      completeQuizPath[currentStepData.nextStepIndex]
    ) {
      setCurrentStepSelection([]);
      navigate(`/quiz/${currentStepData.nextStepIndex + 1}`, { replace: true });
    } else {
      console.warn('No next step found');
    }
  }, [currentStep]);

  const goPreviousStep = useCallback(() => {
    const currentStepData = completeQuizPath[currentStep];
    if (
      typeof currentStepData.previousStepIndex === 'number' &&
      completeQuizPath[currentStepData.previousStepIndex]
    ) {
      setCurrentStepSelection([]);
      navigate(`/quiz/${currentStepData.previousStepIndex + 1}`, {
        replace: true,
      });
    } else {
      console.warn('No next step found');
    }
  }, [currentStep]);

  const processMultipleSelection: MultipleSelectionHandler = (
    answer,
    options
  ) => {
    setCurrentStepSelection((prev) => {
      let newAnswers: AnswerData[];
      if (options?.removeSelectedAnswer) {
        newAnswers = prev.filter(({ value }) => value !== answer.value);
      } else {
        newAnswers = [...prev, answer];
      }
      const hasIcons = Boolean(newAnswers[0]?.icon);
      saveAnswer(
        {
          ...newAnswers.reduce(
            (prev, next) => {
              prev.value += `,${next.value}`;
              prev.name += `,${next.name}`;

              if (typeof prev?.icon === 'string') {
                prev.icon += `,${next.icon}`;
              }

              return prev;
            },
            { value: '', name: '', ...(hasIcons && { icon: '' }) }
          ),
          ...options.saveOptions,
        },
        options.key
      );

      return newAnswers;
    });
  };

  const saveAnswer = (answer: AnswerDataToSave, key: LocalStorageKeys) => {
    // saving with individual key for updating (reselect) purposes
    // in this function can be API call
    localStorage.setItem(key, JSON.stringify(answer));
  };

  const completeQuizPath = useMemo<QuizStep[]>(
    () => [
      {
        question: t('preferredLanguage'),
        answersExplanation: t('chooseLanguage'),
        selectionType: 'single',
        data: [
          { value: 'english', name: t('english') },
          { value: 'french', name: t('french') },
          { value: 'german', name: t('german') },
          { value: 'spanish', name: t('spanish') },
        ],
        nextStepIndex: 1,
        previousStepIndex: null,
        answerAction: async (answer) => {
          await i18n.changeLanguage(languageMap[answer.value]);
          saveAnswer(
            {
              ...answer,
              order: 1,
              type: 'single-select',
              question: 'preferredLanguage',
            },
            'language'
          );
          goToNextStep();
        },
      },
      {
        question: t('genderIdentityQuestion'),
        answersExplanation: t('howYouIdentify'),
        selectionType: 'single-row',
        data: [
          { value: 'Female', name: t('female'), icon: 'female' },
          { value: 'Male', name: t('male'), icon: 'male' },
          { value: 'Other', name: t('other'), icon: 'wink' },
        ],
        nextStepIndex: 2,
        previousStepIndex: 0,
        answerAction: (answer) => {
          saveAnswer(
            {
              ...answer,
              order: 2,
              type: 'single-select-image',
              question: 'genderIdentityQuestion',
            },
            'genderIdentity'
          );
          goToNextStep();
        },
      },
      {
        question: t('ageQuestion'),
        selectionType: 'single',
        data: [
          {
            value: '18-29 years',
            name: t('yearsRange', { from: 18, to: 29 }),
          },
          {
            value: '30-39 years',
            name: t('yearsRange', { from: 30, to: 39 }),
          },
          {
            value: '40-49 years',
            name: t('yearsRange', { from: 40, to: 49 }),
          },
          { value: '50+', name: '50+' },
        ],
        nextStepIndex: 3,
        previousStepIndex: 1,
        answerAction: (answer) => {
          saveAnswer(
            {
              ...answer,
              order: 3,
              type: 'single-select',
              question: 'ageQuestion',
            },
            'age'
          );
          goToNextStep();
        },
      },
      {
        question: (
          <Trans
            i18nKey="hateTheMostQuestion"
            components={{
              highlight: <span className="highlight" />,
            }}
          />
        ),
        selectionType: 'multiple',
        data: [
          { value: 'lackOfLogic', name: t('lackOfLogic') },
          { value: 'lackOfSpeed', name: t('lackOfSpeed') },
          { value: 'lackOfHumor', name: t('lackOfHumor') },
          { value: 'wayTooGenericEnding', name: t('wayTooGenericEnding') },
        ],
        alternative: {
          reason: {
            key: 'age',
            hasValue: '50+',
          },
          question: t('whatThisBookLacks'),
          data: [
            {
              value: 'characterIntroductions',
              name: t('characterIntroductions'),
            },
            {
              value: 'straightStoryTimeline',
              name: t('straightStoryTimeline'),
            },
            { value: 'commonSenseInEnding', name: t('commonSenseInEnding') },
            { value: 'happyEnding', name: t('happyEnding') },
          ],
        },
        nextStepIndex: 4,
        previousStepIndex: 2,
        answerAction: (answer, options) => {
          processMultipleSelection(answer, {
            ...options,
            key: 'hateTheMost',
            saveOptions: {
              order: 4,
              type: 'multiple',
              question: 'hateTheMostQuestion',
            },
          });
        },
      },
      {
        question: t('favoriteTopicsQuestion'),
        answersExplanation: t('favoriteTopicsExplanation'),
        selectionType: 'multiple-bubble',
        data: [
          { value: 'Werewolf', name: t('werewolf'), icon: 'werewolf' },
          { value: 'Action', name: t('action'), icon: 'action' },
          {
            value: 'Royal Obsession',
            name: t('royalObsession'),
            icon: 'royalObsession',
          },
          { value: 'billionaire', name: t('billionaire'), icon: 'billionaire' },
          { value: 'romance', name: t('romance'), icon: 'romance' },
          { value: 'youngAdult', name: t('youngAdult'), icon: 'youngAdult' },
          { value: 'badBoy', name: t('badBoy'), icon: 'badBoy' },
        ],
        nextStepIndex: null,
        previousStepIndex: 3,
        answerAction: (answer, options) => {
          processMultipleSelection(answer, {
            ...options,
            key: 'favoriteTopics',
            saveOptions: {
              order: 5,
              type: 'bubble',
              question: 'favoriteTopicsQuestion',
            },
          });
        },
      },
    ],
    [i18n.language, goToNextStep]
  );

  const currentStepData: QuizStep = useMemo(() => {
    const data = completeQuizPath[currentStep];
    if (data?.alternative) {
      const requiredValue = JSON.parse(
        localStorage.getItem(data.alternative.reason.key) || '{}'
      );

      if (requiredValue.value === data.alternative.reason.hasValue) {
        data.question = data.alternative.question;
        data.data = data.alternative.data;
      }
    }
    return data;
  }, [completeQuizPath, currentStep]);

  useEffect(() => {
    setCurrentStep(Number(params.id) - 1);
  }, [params.id]);

  return (
    <QuizStateMachineContext.Provider
      value={{
        currentStepData: currentStepData,
        currentStepNumber: currentStep + 1,
        questionsNumber: 5,
        currentStepSelection,
        goToNextStep,
        goPreviousStep,
      }}
    >
      {children}
    </QuizStateMachineContext.Provider>
  );
};

export const useQuizStateMachine = (): QuizStateMachineContextData => {
  const context = useContext(QuizStateMachineContext);
  if (!context) {
    throw new Error(
      'useQuizStateMachine must be used within a QuizStateMachineProvider'
    );
  }
  return context;
};
