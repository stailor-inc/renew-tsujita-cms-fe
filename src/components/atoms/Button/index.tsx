import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next';
import clsx from 'clsx'

import styles from './index.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkTo?: string
  buttonType?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed'
  translationKey?: string;
  style?: React.CSSProperties; // Added style prop for custom styling
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { buttonType = 'primary', title, className, children, linkTo, translationKey, style, ...rest } = props
  const { t } = useTranslation();

  const componentContent = useMemo(() => {
    let component = children
    if (typeof children === 'string' || title) {
      component = <span>{children || title}</span>
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
  }, [linkTo, children, title, t, translationKey])

  return (
    <button ref={ref} className={clsx(className, styles.button, styles[buttonType])} style={style} {...rest}>
      {componentContent}
    </button>
  )
})

export default Button