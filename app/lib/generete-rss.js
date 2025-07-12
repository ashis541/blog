import { Feed } from 'feed'

export async function generateRSSFeed(posts) {
  const siteURL = 'https://yourdomain.com'
  const date = new Date()
  
  const feed = new Feed({
    title: 'My SEO Blog',
    description: 'A modern, SEO-optimized blog built with Next.js',
    id: siteURL,
    link: siteURL,
    language: 'en',
    image: `${siteURL}/og-image.jpg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, My SEO Blog`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
      json: `${siteURL}/rss.json`,
      atom: `${siteURL}/atom.xml`,
    },
    author: {
      name: 'Your Name',
      email: 'your-email@example.com',
      link: siteURL,
    },
  })
  
  posts.forEach((post) => {
    const url = `${siteURL}/posts/${post.slug}`
    
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.content,
      author: [
        {
          name: post.author,
          email: 'your-email@example.com',
          link: siteURL,
        },
      ],
      date: new Date(post.date),
      image: post.image || `${siteURL}/og-image.jpg`,
      category: post.tags.map((tag) => ({
        name: tag,
      })),
    })
  })
  
  return feed.rss2()
}