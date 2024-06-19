import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import clsx from 'clsx'

import styles from './index.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkTo?: string
  buttonType?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed'
  translationKey?: string;
  style?: React.CSSProperties;
  iconSrc?: string;
  iconAlt?: string;
  iconPosition?: 'left' | 'right'; // Added iconPosition prop to determine the icon's position
  isLoading?: boolean; // Added isLoading prop to show loading state
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { buttonType = 'primary', title, className, children, linkTo, translationKey, style, 
          iconSrc,
          iconAlt,
          iconPosition = 'left', // Default icon position to left
          isLoading, // Destructure isLoading from props
          ...rest } = props
  const { t } = useTranslation();

  const componentContent = useMemo(() => {
    let component = children
    if (typeof children === 'string' || title) {
      component = <span>{children || title}</span>
    }

    if (isLoading) {
      component = (
        <>
          <span className={styles.loader}></span>
          {component}
        </>
      );
    }

    if (iconSrc) {
      component = (
        <div className={clsx(styles.iconWrapper, {
          [styles.iconLeft]: iconPosition === 'left',
          [styles.iconRight]: iconPosition === 'right',
        })}>
          <Image src={iconSrc} alt={iconAlt || 'Button icon'} width={24} height={24} />
        </div>
      );
    }

    if (linkTo) {
      return (
        <a href={linkTo} className={styles.link_tag}>
          {t(translationKey || '')}
          {iconPosition === 'left' ? component : null}
          {component}
          {iconPosition === 'right' ? component : null}
        </a>
      )
    }
    return component
  }, [linkTo, children, title, t, translationKey, iconSrc, iconAlt, iconPosition, isLoading]) // Added iconPosition and isLoading to dependency array

  return (
    <button ref={ref} className={clsx(className, styles.button, styles[buttonType])} style={style} {...rest}>
      {componentContent}
    </button>
  )
})

export default Button