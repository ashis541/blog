import { getAllPosts } from '../lib/posts'
import { generateRSSFeed } from '../lib/generete-rss'

export async function GET() {
  const posts = await getAllPosts()
  const rss = await generateRSSFeed(posts)
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}