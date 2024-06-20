import React from 'react';
import styles from './index.module.css';
import Image from 'next/image'; // Added import for Image
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
  labelTranslationKey?: string; // Added labelTranslationKey prop for label translation
  errorTranslationKey?: string; // Added errorTranslationKey prop for error message translation
  containerClassName?: string; // Added containerClassName prop for custom class names of the container
  containerStyle?: React.CSSProperties; // Added containerStyle prop for custom styling of the container
  iconSrc?: string; // Added iconSrc prop for input icon
  iconAlt?: string; // Added iconAlt prop for input icon alt text
}

const Input: React.FC<InputProps> = ({
  errorMessage,
  label,
  labelTranslationKey,
  errorTranslationKey,
  containerStyle,
  containerClassName,
  iconSrc, // Destructure iconSrc from props
  iconAlt, // Destructure iconAlt from props
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div style={containerStyle} className={clsx(styles.inputWrapper, { [styles.inputWrapperWithIcon]: iconSrc }, containerClassName)}>
      {label && !labelTranslationKey ? (
        <label htmlFor={props.id} className={styles.labelWithIcon}>
          {label}
        </label>
      ) : null}
      {iconSrc && (
        <div className={styles.inputIcon}>
          <Image src={iconSrc} alt={iconAlt || 'Input icon'} width={24} height={24} />
        </div>
      )}
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