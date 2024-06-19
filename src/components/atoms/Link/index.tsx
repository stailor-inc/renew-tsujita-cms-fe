import React from 'react';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import styles from './index.module.css';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  translationKey: string;
  style?: React.CSSProperties; // Added style prop for custom styling
  className?: string; // Added className prop for custom class names
  containerStyle?: React.CSSProperties; // Added containerStyle prop for custom styling of the container
}

const Link: React.FC<LinkProps> = ({ translationKey, style, className, containerStyle, ...props }) => {
  const { t } = useTranslation();

  return (
    <div style={containerStyle}>
      <a className={clsx(styles.link, className)} style={style} {...props}>
        {t(translationKey)}
      </a>
    </div>
  );
};

export default Link;