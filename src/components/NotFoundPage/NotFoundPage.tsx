import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  const [seconds, setSeconds] = useState(5);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds === 0) {
      navigate('quiz/1');
    }
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          clearInterval(interval);
        }
        return --prev;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="not-found__wrapper">
      <h1 className="not-found__title">{t('paGeNotFound')}</h1>
      <p className="secondary-text">{t('redirectingBackToAppIn', { seconds })}</p>
    </div>
  );
};
