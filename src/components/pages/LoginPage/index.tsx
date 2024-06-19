import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Input } from '@components/atoms/Input';
import { Label } from '@components/atoms/Label';
import { Link } from '@components/atoms/Link';
import { Button } from '@components/atoms/Button';
import styles from './index.module.css';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className={styles.pageBackground}>
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer}>
          <img src="https://studio-next.jitera.app/no.png" alt="CMS Logo" className={styles.logoImage} />
          <span className={styles.cmsTitle}>CMS</span>
        </div>
        <span className={styles.loginPrompt}>{t('LoginPage.enter_login_info')}</span>
        <div className={styles.formGroup}>
          <Label translationKey="LoginPage.email_address_required" />
          <Input
            type="email"
            required
            placeholder={t('LoginPage.enter_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>{t('LoginPage.required_field')}</span>
          <Label translationKey="LoginPage.password_required" />
          <Input
            type="password"
            required
            placeholder={t('LoginPage.enter_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>{t('LoginPage.required_field')}</span>
        </div>
        <div className={styles.rememberMeContainer}>
          <label className={styles.rememberMeLabel}>
            <Input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>{t('LoginPage.remember_password')}</span>
          </label>
        </div>
        <Link href="/reset-password" translationKey="LoginPage.forgot_password" />
        <Button className={styles.signInButton}>{t('LoginPage.sign_in')}</Button>
        <div className={styles.accountQuery}>
          <span className={styles.accountQueryText}>{t('LoginPage.already_have_account')}</span>
          <Link href="/sign-up" translationKey="LoginPage.sign_up" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;