import React from 'react';
import styles from './index.module.css';
import { useTranslation } from 'next-i18next';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({ errorMessage, ...props }) => {
  const { t } = useTranslation();

  return (
    <div>
      <input
        className={`${styles.input} ${errorMessage ? styles.inputError : ''}`}
        {...props}
      />
      {errorMessage && <span className={styles.errorMessage}>{t(errorMessage)}</span>}
    </div>
  );
};

export default Input;