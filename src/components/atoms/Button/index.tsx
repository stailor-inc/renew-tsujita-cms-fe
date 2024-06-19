import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next';
import Image from 'next/image'; // Added import for Image
import clsx from 'clsx'

import styles from './index.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkTo?: string
  buttonType?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed'
  translationKey?: string;
  style?: React.CSSProperties; // Added style prop for custom styling
  iconSrc?: string; // Added iconSrc prop for button icon
  iconAlt?: string; // Added iconAlt prop for button icon alt text
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { buttonType = 'primary', title, className, children, linkTo, translationKey, style, 
          iconSrc, // Destructure iconSrc from props
          iconAlt, // Destructure iconAlt from props
          ...rest } = props
  const { t } = useTranslation();

  const componentContent = useMemo(() => {
    let component = children
    if (typeof children === 'string' || title) {
      component = <span>{children || title}</span>
    }

    if (iconSrc) {
      component = (
        <Image src={iconSrc} alt={iconAlt || 'Button icon'} width={24} height={24} />
      );
    }

    if (linkTo) {
      return (
        <a href={linkTo} className={styles.link_tag}>
          {t(translationKey || '')}
          {component}
        </a>
      )
    }
    return component
  }, [linkTo, children, title, t, translationKey, iconSrc, iconAlt]) // Added iconSrc and iconAlt to dependency array

  return (
    <button ref={ref} className={clsx(className, styles.button, styles[buttonType])} style={style} {...rest}>
      {componentContent}
    </button>
  )
})

export default Button