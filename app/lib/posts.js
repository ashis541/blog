import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
const postsDirectory = path.join(process.cwd(), 'app/content/posts')

export async function getAllPosts() {
  // Get file names under /posts
  debugger
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        
        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)
        
        // Calculate reading time (approximate)
        const wordCount = matterResult.content.split(/\s+/).length
        const readTime = Math.ceil(wordCount / 200) // 200 words per minute
        
        return {
          slug,
          readTime,
          ...matterResult.data,
        }
      })
  )
  
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()
    
    // Calculate reading time
    const wordCount = matterResult.content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)
    
    return {
      slug,
      content: contentHtml,
      readTime,
      ...matterResult.data,
    }
  } catch (error) {
    return null
  }
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }))
}