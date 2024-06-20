import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next';
import Image from 'next/image'; // Added import for Image
import clsx from 'clsx'

import styles from './index.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkTo?: string
  buttonType?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed'
  translationKey?: string; // Added translationKey prop for button text translation
  style?: React.CSSProperties; // Added style prop for custom styling
  iconSrc?: string; // Added iconSrc prop for button icon
  iconAlt?: string; // Added iconAlt prop for button icon alt text
  iconPosition?: 'left' | 'right'; // Added iconPosition prop to determine the icon's position
  loading?: boolean; // Added loading prop to show a loader
  disabled?: boolean; // Added disabled prop to disable the button
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { buttonType = 'primary', title, className, children, linkTo, translationKey, style, 
          iconSrc, // Destructure iconSrc from props
          iconAlt, // Destructure iconAlt from props
          iconPosition = 'left', // Destructure iconPosition from props with default value
          loading = false, // Destructure loading from props with default value
          ...rest } = props
  const { t } = useTranslation();

  const componentContent = useMemo(() => {
    let component = children
    if (typeof children === 'string' || title) {
      component = <span>{children || title}</span>
    } else if (loading) {
      component = (
        <div className={styles.loader} />
      );
    }

    if (iconSrc && !loading) {
      const iconElement = <Image src={iconSrc} alt={iconAlt || 'Button icon'} width={24} height={24} />;
      component = iconPosition === 'left' ? <><iconElement />{component}</> : <>{component}<iconElement /></>;
    }

    if (translationKey && !iconSrc && !loading) {
      component = t(translationKey);
    }

    if (linkTo) {
      return (
        <a href={linkTo} className={styles.link_tag}>
          {t(translationKey)}
        </a> // Use translation for link text
      )
    }
    return component
  }, [linkTo, children, title, t, translationKey, iconSrc, iconAlt, iconPosition, loading]) // Added iconPosition and loading to dependency array

  return (
    <button ref={ref} className={clsx(className, styles.button, styles[buttonType], { [styles.loading]: loading })} style={style} disabled={loading || props.disabled} {...rest}>
      {componentContent}
    </button> // Apply loading and disabled styles if necessary
  )
})

export default React.memo(Button)