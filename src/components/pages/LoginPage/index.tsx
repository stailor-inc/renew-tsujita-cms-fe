import React, { useState, CSSProperties } from 'react';
import { useTranslation } from 'next-i18next';
import Input from '@components/atoms/Input';
import Label from '@components/atoms/Label';
import Link from '@components/atoms/Link';
import Button from '@components/atoms/Button';
import styles from './index.module.css';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className={styles.pageBackground}>
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer} style={{ width: '284px', height: '44px' }}>
          <img src="https://studio-next.jitera.app/no.png" alt={t('LoginPage.logo_alt')} className={styles.logoImage} />
          <span className={styles.cmsTitle}>{t('LoginPage.cms')}</span>
        </div>
        <span className={styles.loginPrompt}>{t('LoginPage.login_info')}</span>
        <div className={styles.formGroup}>
          <Label translationKey="LoginPage.email_address_required" />
          <Input
            type="email"
            id="email"
            required
            placeholder={t('LoginPage.enter_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className={styles.errorMessage}>{t('LoginPage.required_field')}</span>
          <Label translationKey="LoginPage.password_required" />
          <Input
            id="password"
            type="password"
            required
            placeholder={t('LoginPage.enter_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className={styles.errorMessage}>{t('LoginPage.required_field')}</span>
        </div>
        <div className={styles.rememberMeContainer} style={{ marginBottom: '24px' }}>
          <Input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            id="remember-password"
          />
          <Label translationKey="LoginPage.remember_me" htmlFor="remember-password" />
        </div>
        <Link href="/reset-password" translationKey="LoginPage.forgot_password" className={styles.link} />
        <Button translationKey="LoginPage.sign_in" className={styles.signInButton} />
        <div className={styles.accountQuery}>
          <span className={styles.accountQueryText}>{t('LoginPage.already_have_account')}?</span>
          <Link href="/sign-up" translationKey="LoginPage.sign_up_here" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;