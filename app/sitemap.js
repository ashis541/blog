import { getAllPosts } from '../lib/posts'

export default async function sitemap() {
  const posts = await getAllPosts()
  
  const postUrls = posts.map((post) => ({
    url: `https://yourdomain.com/posts/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postUrls,
  ]
}