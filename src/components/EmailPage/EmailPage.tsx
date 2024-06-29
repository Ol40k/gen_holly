import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RadialLoader } from '../RadialLoader/RadialLoader';

import { EmailForm } from './EmailForm/EmailForm';

export const EmailPage: React.FC = () => {
  const { t } = useTranslation();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // need to show complete state of loader for a moment

  useEffect(() => {
    let timeoutId: number;
    if (loadingProgress === 100) {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    return () => {
      clearInterval(timeoutId);
    };
  }, [loadingProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        return 100;
      });
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <RadialLoader
          percentages={loadingProgress}
          loadingText={t('findingCollection')}
        />
      )}
      {!isLoading && <EmailForm />}
    </>
  );
};
