import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LoginPageComponent from '@components/pages/LoginPage'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale = 'en' } = context
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'LoginPage'])),
      seo: {
        title: 'Login - Your Site Name',
        description: 'Login to access your account.',
      },
    },
  }
}

export default LoginPageComponent
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LoginPageComponent from '@components/pages/LoginPage'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale = 'en' } = context
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'LoginPage'])),
      seo: {
        title: 'Login - Your Site Name',
        description: 'Login to access your account.',
      },
    },
  }
}

export default LoginPageComponent