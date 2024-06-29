import { Trans, useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormInput } from '../FormInput/FormInput';
import { Button } from '../../Button/Button';
import { isValidEmail } from '../../../validations/emailValidations';

import './EmailForm.scss';

export const EmailForm: React.FC = () => {
  const { t } = useTranslation();
  const [fieldsValidity, setFieldsValidity] = useState({
    email: false,
  });

  const isFormValid = useMemo(
    () => Object.values(fieldsValidity).every((value) => value === true),
    [fieldsValidity]
  );

  const navigate = useNavigate();

  return (
    <form className="email-form">
      <h1 className="email-form__title">{t('email')}</h1>
      <p className="secondary-text">{t('enterYourEmail')}</p>
      <FormInput
        type="email"
        placeholder={t('yourEmail')}
        required
        validation={isValidEmail}
        onValidityChange={(isValid) =>
          setFieldsValidity({ ...fieldsValidity, email: isValid })
        }
      />
      <p className="email-form__legal-compliance">
        <Trans
          i18nKey="legalCompliance"
          components={[
            <a className="link" href="#" />,
            <a className="link" href="#" />,
          ]}
        />
      </p>

      <Button
        disabled={!isFormValid}
        onClick={() => {
          navigate('/thank-you');
        }}
      >
        {t('next')}
      </Button>
    </form>
  );
};
