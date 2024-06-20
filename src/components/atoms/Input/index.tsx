import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
  labelTranslationKey?: string; // Added labelTranslationKey prop for label translation
  errorTranslationKey?: string; // Added errorTranslationKey prop for error message translation
  containerClassName?: string; // Added containerClassName prop for custom class names of the container
  containerStyle?: React.CSSProperties; // Added containerStyle prop for custom styling of the container
}

const Input: React.FC<InputProps> = ({
  errorMessage,
  label,
  labelTranslationKey,
  errorTranslationKey,
  containerStyle,
  containerClassName,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div style={containerStyle} className={clsx(containerClassName)}>
      {label && !labelTranslationKey ? (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      ) : null}
      {labelTranslationKey && (
        <label htmlFor={props.id} className={styles.label}>
          {t(labelTranslationKey)}
        </label>
      )}
      <input
        className={clsx(styles.input, { [styles.inputError]: errorMessage })}
        {...props}
      />
      {errorMessage && (
        <span className={styles.errorMessage}>
          {t(errorTranslationKey || errorMessage)}
        </span>
      )}
    </div>
  );
};

export default React.memo(Input);