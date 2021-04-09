import styled from 'styled-components'
import { getAllContents } from './api'
import Link from 'next/link'
import AppLayout from '@/components/layout'

const Wrapper = styled.div`
  font-size: 1.25rem;
`

const StyledLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`

export default function Home({ contents }) {
  return (
    <AppLayout title="리스트">
      <Wrapper>
        <ul>
          {contents.map((content) => (
            <Link href={`/contents/${content.fileName}`} key={content.fileName}>
              <li>
                <StyledLink href="">{content.title}</StyledLink>
              </li>
            </Link>
          ))}
        </ul>
      </Wrapper>
    </AppLayout>
  )
}

export const getStaticProps = (context) => {
  const allContents = getAllContents()
  const contents = allContents.map((content) => {
    const fileName = content.fileName.replace('.md', '')
    const title = content.md.data.title

    return {
      fileName,
      title
    }
  })

  return {
    props: {
      contents
    }
  }
}
