import Head from 'next/head'

export default function AppLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - 말랑말랑 프론트엔드</title>
        <meta
          property="og:title"
          content={`${title} - 말랑말랑 프론트엔드`}
          key="og:title"
        />
        <meta
          property="og:description"
          content="말랑말랑 프론트엔드 마크다운 렌더링"
          key="og:description"
        />
      </Head>
      {children}
    </>
  )
}
