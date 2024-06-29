import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '../Button/Button';
import { localStorageKeys } from '../../constants/LocalStorageKeys';

import { DownloadAnswers } from './ThankYouPageMisc/DownloadAnswers/DownloadAnswers';

import ThankYouImg from '../../assets/customizedPhrases/thankYou.svg';
import Checkmark from '../../assets/checkmarks/checkmark.png';

import './ThankYouPage.scss';

export const ThankYouPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const retakeQuiz = () => {
    localStorageKeys.map((key) => localStorage.removeItem(key));
    navigate('/quiz/1');
  };

  return (
    <section className="thank-you-page">
      <img width={135} height={44} src={ThankYouImg} alt={t('thankYou')} />
      <p className="thank-you-page__message">{t('thankYouMessage')}</p>
      <div className="thank-you-page__checkmark">
        <img src={Checkmark} alt={t('success')} />
      </div>
      <div className="thank-you-page__download-wrapper">
        <DownloadAnswers />
      </div>
      <div className="thank-you-page__finish-btn"> 
        <Button onClick={retakeQuiz}>{t('retakeQuiz')}</Button>
      </div>
    </section>
  );
};
