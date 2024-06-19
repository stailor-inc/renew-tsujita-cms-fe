import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LoginPage from '@components/pages/LoginPage'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale = 'en' } = context
  return {
    props: {
      ...(await serverSideTranslations(locale, ['all'])),
      seo: {
        title: 'Login - Your Site Name',
        description: 'Login to access your account.',
      },
    },
  }
}

export default LoginPage