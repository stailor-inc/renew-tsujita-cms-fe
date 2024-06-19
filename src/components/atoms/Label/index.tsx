import React from 'react';
import styles from './index.module.css';
import { useTranslation } from 'next-i18next';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  translationKey: string;
}

const Label: React.FC<LabelProps> = ({ translationKey, children, ...props }) => {
  const { t } = useTranslation();

  return (
    <label className={styles.label} {...props}>
      {t(translationKey)}
      {children}
    </label>
  );
};

export default Label;