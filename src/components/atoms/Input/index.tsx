import React from 'react';
import styles from './index.module.css';
import { useTranslation } from 'next-i18next';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ errorMessage, label, ...props }) => {
  const { t } = useTranslation();

  return (
    <div>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {t(label)}
        </label>
      )}
      <input
        className={`${styles.input} ${errorMessage ? styles.inputError : ''}`}
        {...props}
      />
      {errorMessage && <span className={styles.errorMessage}>{t(errorMessage)}</span>}
    </div>
  );
};

export default Input;