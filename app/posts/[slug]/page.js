import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '../../lib/posts'
import { format } from 'date-fns'
import { 
  Clock,
  Calendar,
  User,
  ArrowLeft,
  Rss,
  Share2,
  BookOpen
} from 'lucide-react'
import SocialShare from './SocialShare'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | My SEO Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      authors: [post.author],
      section: post.category || 'Blog',
      tags: post.tags,
      images: [
        {
          url: post.image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image || '/og-image.jpg'],
      creator: '@yourtwitterhandle',
    },
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorUrl || undefined,
    },
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    image: {
      '@type': 'ImageObject',
      url: post.image || '/og-image.jpg',
      width: 1200,
      height: 630,
    },
    publisher: {
      '@type': 'Organization',
      name: 'My SEO Blog',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourdomain.com/posts/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.wordCount || undefined,
    articleSection: post.category || 'Blog',
    inLanguage: 'en-US',
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://yourdomain.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Posts',
        item: 'https://yourdomain.com/posts',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://yourdomain.com/posts/${post.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Enhanced Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb navigation" className="mb-8 lg:mb-12">
            <ol className="flex items-center space-x-3 text-sm lg:text-base" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  itemProp="item"
                >
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-gray-400" aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  href="/posts" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  itemProp="item"
                >
                  <span itemProp="name">Posts</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-gray-400" aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-gray-900 font-semibold" itemProp="name">
                  {post.title}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <main className="lg:col-span-3">
              <article 
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-shadow duration-300"
                itemScope 
                itemType="https://schema.org/BlogPosting"
              >
                {/* Enhanced Hero Image Section */}
                {post.image && (
                  <figure className="relative h-72 md:h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.imageAlt || post.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      itemProp="image"
                      loading="eager"
                      width="1200"
                      height="630"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 text-white/90">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {post.category || 'Article'}
                        </span>
                      </div>
                    </div>
                  </figure>
                )}

                {/* Enhanced Header Section */}
                <header className="p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    <h1 
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
                      itemProp="headline"
                    >
                      {post.title}
                    </h1>
                    
                    {post.excerpt && (
                      <p 
                        className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light"
                        itemProp="description"
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  
                  {/* Enhanced Meta Information */}
                  <div className="flex flex-wrap items-center gap-6 lg:gap-8 text-gray-600 py-6 border-t border-b border-gray-100">
                    <div className="flex items-center gap-3 group">
                      <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Published</span>
                        <time 
                          dateTime={post.date} 
                          className="text-sm font-semibold text-gray-800"
                          itemProp="datePublished"
                        >
                          {format(new Date(post.date), 'MMMM d, yyyy')}
                        </time>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 group">
                      <div className="p-2 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Author</span>
                        <span 
                          className="text-sm font-semibold text-gray-800"
                          itemProp="author"
                          itemScope
                          itemType="https://schema.org/Person"
                        >
                          <span itemProp="name">{post.author}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 group">
                      <div className="p-2 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Read Time</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {post.readTime} min read
                        </span>
                      </div>
                    </div>

                    {post.updatedDate && post.updatedDate !== post.date && (
                      <div className="flex items-center gap-3 group">
                        <div className="p-2 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors">
                          <Share2 className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Updated</span>
                          <time 
                            dateTime={post.updatedDate} 
                            className="text-sm font-semibold text-gray-800"
                            itemProp="dateModified"
                          >
                            {format(new Date(post.updatedDate), 'MMM d, yyyy')}
                          </time>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced Tags Section */}
                  {post.tags && post.tags.length > 0 && (
                    <section className="space-y-4" aria-labelledby="tags-heading">
                      <h2 id="tags-heading" className="text-lg font-semibold text-gray-800 mb-4">
                        Topics Covered
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {post.tags.map((tag, index) => (
                          <Link
                            key={tag}
                            href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                            className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-5 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            itemProp="keywords"
                          >
                            <span className="relative z-10">{tag}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}
                </header>

                {/* Enhanced Content Section */}
                <section className="px-8 md:px-12 pb-16 bg-gradient-to-b from-white to-gray-50/30" aria-labelledby="article-content">
                  <h2 id="article-content" className="sr-only">Article Content</h2>
                  
                  {/* Content Container with Enhanced Styling */}
                  <div className="relative">
                    {/* Decorative Elements */}
                    <div className="absolute -left-4 top-0 w-1 h-32 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-30"></div>
                    
                    <div 
                      className="article-content prose prose-lg lg:prose-xl max-w-none space-y-8
                      
                      /* Headings - No H1 since we have one in header */
                      prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-20
                      prose-h2:text-3xl prose-h2:mb-8 prose-h2:mt-16 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-gradient-to-r prose-h2:from-blue-500 prose-h2:to-purple-500 prose-h2:relative
                      prose-h2:before:absolute prose-h2:before:bottom-0 prose-h2:before:left-0 prose-h2:before:w-full prose-h2:before:h-0.5 prose-h2:before:bg-gradient-to-r prose-h2:before:from-blue-500 prose-h2:before:to-purple-500 prose-h2:before:rounded-full
                      prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-12 prose-h3:text-blue-900 prose-h3:relative
                      prose-h3:before:absolute prose-h3:before:-left-6 prose-h3:before:top-1/2 prose-h3:before:-translate-y-1/2 prose-h3:before:w-3 prose-h3:before:h-3 prose-h3:before:bg-blue-500 prose-h3:before:rounded-full
                      prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-8 prose-h4:text-gray-800 prose-h4:font-semibold
                      prose-h5:text-lg prose-h5:mb-3 prose-h5:mt-6 prose-h5:text-gray-700 prose-h5:font-medium
                      prose-h6:text-base prose-h6:mb-2 prose-h6:mt-4 prose-h6:text-gray-600 prose-h6:font-medium prose-h6:uppercase prose-h6:tracking-wide
                      
                      /* Paragraphs with better spacing */
                      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg prose-p:first-letter:text-4xl prose-p:first-letter:font-bold prose-p:first-letter:text-blue-600 prose-p:first-letter:float-left prose-p:first-letter:mr-2 prose-p:first-letter:mt-1 prose-p:first-of-type:first-letter:text-6xl prose-p:first-of-type:first-letter:leading-none
                      
                      /* Links with enhanced styling */
                      prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium prose-a:relative prose-a:px-1 prose-a:-mx-1 prose-a:rounded
                      hover:prose-a:bg-blue-50 hover:prose-a:text-blue-700 prose-a:transition-all prose-a:duration-200
                      prose-a:after:absolute prose-a:after:bottom-0 prose-a:after:left-0 prose-a:after:w-0 prose-a:after:h-0.5 prose-a:after:bg-blue-600 prose-a:after:transition-all prose-a:after:duration-300
                      hover:prose-a:after:w-full
                      
                      /* Enhanced Lists */
                      prose-ul:space-y-4 prose-ul:my-8 prose-ul:pl-0
                      prose-ol:space-y-4 prose-ol:my-8 prose-ol:pl-0
                      prose-li:text-gray-700 prose-li:leading-relaxed prose-li:relative prose-li:pl-8
                      prose-ul>prose-li:before:absolute prose-ul>prose-li:before:left-0 prose-ul>prose-li:before:top-2 prose-ul>prose-li:before:w-3 prose-ul>prose-li:before:h-3 prose-ul>prose-li:before:bg-gradient-to-r prose-ul>prose-li:before:from-blue-500 prose-ul>prose-li:before:to-purple-500 prose-ul>prose-li:before:rounded-full prose-ul>prose-li:before:content-['']
                      prose-ol>prose-li:before:absolute prose-ol>prose-li:before:left-0 prose-ol>prose-li:before:top-0 prose-ol>prose-li:before:w-6 prose-ol>prose-li:before:h-6 prose-ol>prose-li:before:bg-gradient-to-r prose-ol>prose-li:before:from-blue-500 prose-ol>prose-li:before:to-purple-500 prose-ol>prose-li:before:rounded-full prose-ol>prose-li:before:text-white prose-ol>prose-li:before:text-xs prose-ol>prose-li:before:font-bold prose-ol>prose-li:before:flex prose-ol>prose-li:before:items-center prose-ol>prose-li:before:justify-center
                      
                      /* Blockquotes with enhanced design */
                      prose-blockquote:border-l-0 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50 prose-blockquote:to-indigo-50 
                      prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:my-12 prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:text-gray-800 prose-blockquote:shadow-lg prose-blockquote:relative
                      prose-blockquote:before:absolute prose-blockquote:before:top-4 prose-blockquote:before:left-6 prose-blockquote:before:text-6xl prose-blockquote:before:text-blue-300 
                      prose-blockquote:after:absolute prose-blockquote:after:bottom-4 prose-blockquote:after:right-6 prose-blockquote:after:text-6xl prose-blockquote:after:text-blue-300 
                      
                      /* Code styling */
                      prose-code:bg-gray-100 prose-code:px-3 prose-code:py-1.5 prose-code:rounded-lg prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-gray-200 prose-code:text-purple-700 prose-code:font-semibold
                      prose-code:before:content-[''] prose-code:after:content-['']
                      
                      /* Pre blocks for code */
                      prose-pre:bg-gradient-to-br prose-pre:from-gray-900 prose-pre:to-gray-800 prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:p-8 prose-pre:overflow-x-auto prose-pre:shadow-2xl prose-pre:border prose-pre:border-gray-700 prose-pre:my-10 prose-pre:relative
                      prose-pre:before:absolute prose-pre:before:top-4 prose-pre:before:right-6 prose-pre:before:text-xs prose-pre:before:text-gray-400 prose-pre:before:content-['CODE'] prose-pre:before:font-mono
                      
                      /* Images with enhanced styling */
                      prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12 prose-img:border prose-img:border-gray-200 prose-img:hover:shadow-3xl prose-img:transition-all prose-img:duration-300 prose-img:hover:scale-[1.02]
                      
                      /* Tables with modern design */
                      prose-table:shadow-2xl prose-table:rounded-2xl prose-table:overflow-hidden prose-table:my-12 prose-table:border-0
                      prose-thead:bg-gradient-to-r prose-thead:from-blue-600 prose-thead:to-purple-600
                      prose-th:bg-transparent prose-th:text-white prose-th:font-bold prose-th:py-4 prose-th:px-6 prose-th:text-left prose-th:border-0
                      prose-td:py-4 prose-td:px-6 prose-td:border-b prose-td:border-gray-100 prose-td:text-gray-700 
                      prose-tbody:prose-tr:hover:bg-gray-50 prose-tbody:prose-tr:transition-colors
                      
                      /* Strong and emphasis */
                      prose-strong:text-gray-900 prose-strong:font-bold prose-strong:bg-yellow-100 prose-strong:px-1 prose-strong:rounded prose-strong:text-yellow-900
                      prose-em:text-blue-700 prose-em:font-medium prose-em:not-italic prose-em:bg-blue-50 prose-em:px-1 prose-em:rounded
                      
                      /* HR styling */
                      prose-hr:border-0 prose-hr:h-1 prose-hr:bg-gradient-to-r prose-hr:from-blue-500 prose-hr:to-purple-500 prose-hr:rounded-full prose-hr:my-16 prose-hr:opacity-30"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      itemProp="articleBody"
                    />
                    
                    {/* Reading Progress Indicator */}
                    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300" style={{width: '0%'}} id="reading-progress"></div>
                    </div>
                  </div>
                </section>

                {/* Article Footer */}
                <footer className="px-8 md:px-12 pb-8 border-t border-gray-100 mt-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
                    <div className="text-sm text-gray-500">
                      Last updated: 
                      <time dateTime={post.updatedDate || post.date} className="ml-1 font-medium">
                        {format(new Date(post.updatedDate || post.date), 'MMMM d, yyyy')}
                      </time>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <BookOpen className="w-4 h-4" />
                      <span>{post.wordCount || 'Unknown'} words</span>
                    </div>
                  </div>
                </footer>
              </article>
            </main>

            {/* Enhanced Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <SocialShare post={post} />
              
              {/* Table of Contents placeholder */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Table of Contents
                </h3>
                {/* TOC would be generated from headings */}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}