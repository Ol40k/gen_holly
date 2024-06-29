import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FormInputProps } from './FormInput.interfaces';

import './FormInput.scss';

export const FormInput: React.FC<FormInputProps> = ({
  validation,
  onValidityChange,
  ...rest
}) => {
  const { t } = useTranslation();
  const [isInvalid, setIsInvalid] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = validation(e.target.value);
    if (!isValid === isInvalid) return; // prevent unnecessary re-renders
    setIsInvalid(!isValid);
    onValidityChange(isValid);
  };

  return (
    <div className="form-input__wrapper">
      <input
        className={['form-input', isInvalid ? 'form-input--invalid' : ''].join(
          ' '
        )}
        {...rest}
        onChange={handleInputChange}
      />
      {isInvalid && <p className="error">{t('invalidEmail')}</p>}
    </div>
  );
};
