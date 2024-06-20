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
        <div className={styles.logoContainer} style={{ marginBottom: '30px' }}>
          <img src="https://studio-next.jitera.app/no.png" alt={t('LoginPage.logo_alt')} className={styles.logoImage} />
          <span className={styles.cmsTitle}>{t('LoginPage.cms')}</span>
        </div>
        <span className={styles.loginPrompt}>{t('LoginPage.enter_login_info')}</span>
        <div className={styles.formGroup}>
          <Label labelTranslationKey="LoginPage.email_address_required" />
          <Input
            type="email"
            id="email"
            required
            placeholder={t('LoginPage.enter_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <span>{t('LoginPage.required_field')}</span>
          <Label labelTranslationKey="LoginPage.password_required" style={{ marginBottom: '10px' }} />
          <Input
            id="password"
            type="password"
            required
            placeholder={t('LoginPage.enter_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <span>{t('LoginPage.required_field')}</span>
        </div>
        <div className={styles.rememberMeContainer} style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
          <label className={styles.rememberMeLabel}>
            <Input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <span>{t('LoginPage.remember_me')}</span>
          </label> 
        </div>
        <Link href="/reset-password" translationKey="LoginPage.forgot_password" />
        <Button className={styles.signInButton} translationKey="LoginPage.sign_in">{t('LoginPage.sign_in')}</Button>
        <div className={styles.accountQuery}>
          <span className={styles.accountQueryText} style={{ gap: '8px', marginTop: '20px' }}>{t('LoginPage.already_have_account')}</span>
          <Link href="/sign-up" translationKey="LoginPage.sign_up_here" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;