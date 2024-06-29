import csvDownload from 'json-to-csv-export';
import { useTranslation } from 'react-i18next';

import { AnswerDataToSave } from '../../../QuizStateMachine/QuizStateMachine.interfaces';
import { localStorageKeys } from '../../../../constants/LocalStorageKeys';

import DownloadIcon from '../../../../assets/icons/download.svg';

import './DownloadAnswers.scss';

export const DownloadAnswers: React.FC = () => {
  const { t } = useTranslation();

  const removingIntegratedNodesFromTranslation = (str: string) => {
    return str
      .replace(/<[^>]*>?/gm, '')
      .replace(/\s\s/gm, ' ')
      .trim();
  };

  const prepareDataForExport = () => {
    // Inside this function can be API call
    const dataToExport = localStorageKeys.map((key) => {
      const data = localStorage.getItem(key);
      if (!data) throw new Error(`No data found in local storage for '${key}'`);
      const dataObj: AnswerDataToSave = JSON.parse(data);

      let answer = dataObj.value;
      if (dataObj.value.includes('years')) {
        const years = answer.match(/\d+/g);
        if (!years) throw new Error('No years found in answer');
        answer = t(answer, { from: years[0], to: years[1] });
      } else if (dataObj.type === 'multiple' || dataObj.type === 'bubble') {
        answer = answer
          .slice(1, answer.length)
          .split(',')
          .map((el) => t(el.trim()))
          .join(', ');
      } else {
        answer = t(answer);
      }
      return {
        order: dataObj.order,
        // exporting in the current language
        // if we need we can use value in object to export whatever we need
        title: removingIntegratedNodesFromTranslation(t(dataObj.question)),
        type: dataObj.type,
        answer: answer,
      };
    });

    const dataToConvert = {
      data: dataToExport,
      filename: 'test_user_data',
      delimiter: ';',
      headers: ['order', 'title', 'type', 'answer'],
    };
    return dataToConvert;
  };

  return (
    <button
      className="download-answers-btn"
      onClick={() => csvDownload(prepareDataForExport())}
    >
      <img
        width={42}
        height={42}
        src={DownloadIcon}
        alt={t('downloadMyAnswers')}
      />
      <span>{t('downloadMyAnswers')}</span>
    </button>
  );
};
