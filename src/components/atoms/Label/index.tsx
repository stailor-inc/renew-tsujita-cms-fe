import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx'; // Added import for clsx
import { useTranslation } from 'next-i18next';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  translationKey: string;
  style?: React.CSSProperties; // Added style prop for custom styling
  className?: string; // Added className prop for custom class names
  containerStyle?: React.CSSProperties; // Added containerStyle prop for custom styling of the container
  containerClassName?: string; // Added containerClassName prop for custom class names of the container
}

const Label: React.FC<LabelProps> = ({
  translationKey,
  style,
  className,
  containerStyle,
  containerClassName, // Destructure containerClassName from props
  children,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div style={containerStyle} className={clsx(containerClassName)}>
      <label className={clsx(styles.label, className)} style={style} {...props}> // Apply custom class names and styles
        {t(translationKey)}
        {children}
      </label>
    </div>
  );
};

export default React.memo(Label);