import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from './index.module.css';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  translationKey: string;
}

const Link: React.FC<LinkProps> = ({ translationKey, ...props }) => {
  const { t } = useTranslation();

  return (
    <a className={styles.link} {...props}>
      {t(translationKey)}
    </a>
  );
};

export default Link;