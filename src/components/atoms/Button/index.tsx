import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next'; // Added import for useTranslation
import clsx from 'clsx'

import styles from './index.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkTo?: string
  buttonType?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed'
  translationKey?: string; // Added translationKey prop
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { buttonType = 'primary', title, className, children, linkTo, translationKey, ...rest } = props
  const { t } = useTranslation(); // Initialized useTranslation hook

  const component = useMemo(() => {
    let component = children
    if (typeof children === 'string' || title) {
      component = <span>{children || title}</span>
    }

    if (linkTo) {
      return (
        <a href={linkTo} className={styles.link_tag}>
          {t(translationKey || '')} {/* Added translation function call */}
          {component}
        </a>
      )
    }
    return component
  }, [linkTo, children, title, t, translationKey]) // Added t and translationKey to dependency array

  return (
    <button ref={ref} className={clsx(className, styles.button, styles[buttonType])} {...rest}>
      {component}
    </button>
  )
})

export default Button