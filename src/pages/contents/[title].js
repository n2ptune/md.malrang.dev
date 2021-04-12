import styled from 'styled-components'
import { getAllContents, getContentByFileName } from '@/pages/api'
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'
import 'github-markdown-css'
import AiOutlineDoubleRight from '@ant-design/icons/DoubleRightOutlined'
import AiOutlineDoubleLeft from '@ant-design/icons/DoubleLeftOutlined'
import Link from 'next/link'
import AppLayout from '@/components/layout'

const Wrapper = styled.section`
  max-width: 800px;
  display: block;
  margin: 0 auto;
  padding: 5rem 0;

  @media screen and (max-width: 768px) {
    padding: 5rem 1rem;
  }
`

const iconCSS = `
  font-size: 2rem;
  color: gray;

  &:hover {
    color: black;
    cursor: pointer;
  }
`

const RightIcon = styled(AiOutlineDoubleRight)`
  position: fixed;
  top: 50%;
  right: 25px;
  ${iconCSS}
`

const LeftIcon = styled(AiOutlineDoubleLeft)`
  position: fixed;
  top: 50%;
  left: 25px;
  ${iconCSS}
`

export default function Content(props) {
  return (
    <AppLayout title={props.content.md.data.title}>
      <Wrapper>
        {props.isPrev && (
          <Link href={`/contents/${props.isPrev}`}>
            <LeftIcon />
          </Link>
        )}
        {props.isNext && (
          <Link href={`/contents/${props.isNext}`}>
            <RightIcon />
          </Link>
        )}
        <Markdown
          className="markdown-body"
          children={props.content.md.content}
          plugins={[gfm]}
          allowDangerousHtml
        />
      </Wrapper>
    </AppLayout>
  )
}

export const getStaticProps = ({ params }) => {
  const allContents = getAllContents()
  const content = getContentByFileName(params.title)

  const prev =
    allContents.find((con) => {
      return con.md.data.linkTo === params.title
    }) || false
  const isPrev = prev ? prev.fileName.replace('.md', '') : false
  const isNext = content.md.data.linkTo || false

  return {
    props: {
      content,
      isPrev,
      isNext
    }
  }
}

export const getStaticPaths = (c) => {
  const contents = getAllContents()
  const paths = contents.map(
    (post) => `/contents/${post.fileName.replace('.md', '')}`
  )

  return {
    paths,
    fallback: false
  }
}
