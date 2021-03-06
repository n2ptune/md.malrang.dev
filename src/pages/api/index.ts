import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'
import remark from 'remark'
import strip from 'strip-markdown'

export const getAllContents = () => {
  const postsDirectory = path.join(process.cwd(), 'src/contents')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = []

  for (const fileName of filenames) {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = matter(fs.readFileSync(filePath, 'utf8'), {
      excerpt: true
    })

    posts.push({
      md: fileContents,
      fileName
    })
  }

  return posts
}

export const getContentByFileName = (fileName) => {
  const postsDirectory = path.join(process.cwd(), 'src/contents')
  const filenames = fs.readdirSync(postsDirectory)

  const target = filenames
    .map((f) => f.replace('.md', ''))
    .find((f) => f === fileName)

  if (target) {
    const md = matter(
      fs.readFileSync(path.join(postsDirectory, fileName + '.md'), 'utf8'),
      {
        excerpt: true
      }
    )
    const d = remark().use(strip).processSync(md.content)
    const transformMd = {
      content: md.content,
      data: md.data,
      excerpt: md.excerpt
    }
    return {
      md: transformMd,
      fileName
    }
  } else {
    return null
  }
}
