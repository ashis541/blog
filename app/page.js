import Link from 'next/link'
import { getAllPosts } from './lib/posts'
import { format } from 'date-fns'

export const metadata = {
  title: 'Tech Insights Blog - Web Development & Technology Trends',
  description: 'Discover expert insights on web development, React, Next.js, and cutting-edge technology trends. Stay ahead with our comprehensive guides and tutorials.',
  keywords: 'web development, React, Next.js, JavaScript, SEO, technology blog, programming tutorials',
  openGraph: {
    title: 'Tech Insights Blog - Web Development & Technology Trends',
    description: 'Expert insights on web development, React, Next.js, and technology trends',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Insights Blog - Web Development & Technology Trends',
    description: 'Expert insights on web development, React, Next.js, and technology trends',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
}

export default async function Home() {
  const posts = await getAllPosts()
  const featuredPosts = posts.slice(0, 6) // Show first 6 posts

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Tech Insights Blog',
    description: 'Expert insights on web development, React, Next.js, and technology trends',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    author: {
      '@type': 'Person',
      name: 'Your Name',
    },
    blogPost: featuredPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'Your Name',
      },
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/posts/${post.slug}`,
    })),
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
                Tech Insights
              </Link>
              <div className="flex space-x-8">
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Contact
                </Link>
                <Link href="/rss.xml" className="text-slate-600 hover:text-slate-900 transition-colors">
                  RSS
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-16 lg:py-24">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Stay Ahead with
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Tech Insights</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover expert insights on web development, React, Next.js, and cutting-edge technology trends. 
                Level up your skills with our comprehensive guides and tutorials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="#latest-posts"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Explore Articles
                </Link>
                <Link 
                  href="/rss.xml"
                  className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
                >
                  Subscribe RSS
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Posts */}
          <section id="latest-posts" className="py-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Fresh insights and tutorials to help you master modern web development
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post, index) => (
                <article 
                  key={post.slug} 
                  className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 ${
                    index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="p-6 lg:p-8">
                    <header className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        <Link 
                          href={`/posts/${post.slug}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <time dateTime={post.date} className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {format(new Date(post.date), 'MMM d, yyyy')}
                        </time>
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {post.author}
                          </span>
                        )}
                      </div>
                    </header>
                    
                    <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Read full article
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {posts.length > 6 && (
              <div className="text-center mt-12">
                <Link 
                  href="/posts"
                  className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-200"
                >
                  View All Articles
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </section>

          {/* Newsletter CTA */}
          <section className="py-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Never Miss an Update
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Subscribe to our RSS feed and get the latest insights delivered straight to your feed reader.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/rss.xml"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Subscribe to RSS Feed
                </Link>
                <Link 
                  href="/about"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Tech Insights</h3>
                <p className="text-slate-400 mb-4 max-w-md">
                  Your go-to source for web development tutorials, technology trends, and expert insights.
                </p>
                <div className="flex space-x-4">
                  <Link href="/rss.xml" className="text-slate-400 hover:text-white transition-colors">
                    RSS
                  </Link>
                  <Link href="/sitemap.xml" className="text-slate-400 hover:text-white transition-colors">
                    Sitemap
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/posts" className="text-slate-400 hover:text-white transition-colors">All Posts</Link></li>
                  <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Topics</h4>
                <ul className="space-y-2">
                  <li><Link href="/tags/react" className="text-slate-400 hover:text-white transition-colors">React</Link></li>
                  <li><Link href="/tags/nextjs" className="text-slate-400 hover:text-white transition-colors">Next.js</Link></li>
                  <li><Link href="/tags/javascript" className="text-slate-400 hover:text-white transition-colors">JavaScript</Link></li>
                  <li><Link href="/tags/web-development" className="text-slate-400 hover:text-white transition-colors">Web Development</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; {new Date().getFullYear()} Tech Insights. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}