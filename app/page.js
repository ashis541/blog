import Link from 'next/link'
import { getAllPosts } from './lib/posts'
import { format } from 'date-fns'

export const metadata = {
  title: 'WellnessPro - Your Guide to Health, Nutrition & Wellness',
  description: 'Discover evidence-based health insights, nutrition tips, wellness strategies, and expert medical advice. Transform your life with our comprehensive health guides and wellness resources.',
  keywords: 'health blog, wellness, nutrition, fitness, mental health, medical advice, healthy lifestyle, preventive care, natural remedies, health tips',
  openGraph: {
    title: 'WellnessPro - Expert Health & Wellness Insights',
    description: 'Evidence-based health advice, nutrition guidance, and wellness strategies from medical professionals',
    type: 'website',
    locale: 'en_US',
    siteName: 'WellnessPro',
    images: [
      {
        url: '/og-health-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'WellnessPro Health & Wellness Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WellnessPro - Expert Health & Wellness Insights',
    description: 'Evidence-based health advice, nutrition guidance, and wellness strategies',
    images: ['/twitter-health-blog.jpg'],
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
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

export default async function Home() {
  const posts = await getAllPosts()
  const featuredPosts = posts.slice(0, 6) // Show first 6 posts

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'WellnessPro',
    description: 'Expert health and wellness insights with evidence-based medical advice, nutrition guidance, and lifestyle tips',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://wellnesspro.com',
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: 'WellnessPro Health Team',
      description: 'Medical professionals and certified health experts',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WellnessPro',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wellnesspro.com'}/logo.png`,
      },
    },
    blogPost: featuredPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'WellnessPro Health Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'WellnessPro',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wellnesspro.com'}/posts/${post.slug}`,
      },
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wellnesspro.com'}/posts/${post.slug}`,
      image: post.featuredImage || '/default-health-article.jpg',
    })),
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-16 lg:py-24 relative">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-4 -right-8 w-24 h-24 bg-emerald-100 rounded-full opacity-60"></div>
              <div className="absolute top-1/3 -left-6 w-16 h-16 bg-teal-100 rounded-full opacity-40"></div>
              <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-green-100 rounded-full opacity-50"></div>
            </div>
            
            <div className="max-w-5xl mx-auto relative">
              {/* Health Icon */}
              <div className="mb-8 flex justify-center">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-full shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Your Journey to
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent block">
                  Optimal Health
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Discover evidence-based health insights, expert nutrition guidance, and proven wellness strategies. 
                Transform your life with trusted medical advice from certified healthcare professionals.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link 
                  href="#latest-posts" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Health Articles
                </Link>
                <Link 
                  href="/categories" 
                  className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                >
                  Browse Topics
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Medically Reviewed
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Evidence-Based
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Expert Authors
                </div>
              </div>
            </div>
          </section>

          {/* Health Categories Preview */}
          <section className="py-16 bg-white/50 rounded-3xl mb-16 backdrop-blur-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Health Topics We Cover
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive health guidance across all aspects of wellness
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Nutrition', icon: '🥗', color: 'from-green-400 to-emerald-500' },
                { name: 'Fitness', icon: '💪', color: 'from-blue-400 to-teal-500' },
                { name: 'Mental Health', icon: '🧠', color: 'from-purple-400 to-indigo-500' },
                { name: 'Preventive Care', icon: '🛡️', color: 'from-rose-400 to-pink-500' },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 text-center group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Posts */}
          <section id="latest-posts" className="py-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Latest Health Insights
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Fresh, evidence-based health articles reviewed by medical professionals
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post, index) => (
                <article 
                  key={post.slug} 
                  className={`group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-emerald-200 ${
                    index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                  }`}
                  itemScope 
                  itemType="https://schema.org/BlogPosting"
                >
                  {/* Featured Image Placeholder */}
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 h-48 flex items-center justify-center">
                    <svg className="w-16 h-16 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  
                  <div className="p-6 lg:p-8">
                    <header className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors" itemProp="headline">
                        <Link 
                          href={`/posts/${post.slug}`}
                          className="hover:underline"
                          itemProp="url"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <time dateTime={post.date} className="flex items-center gap-1" itemProp="datePublished">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {format(new Date(post.date), 'MMM d, yyyy')}
                        </time>
                        {post.author && (
                          <span className="flex items-center gap-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span itemProp="name">{post.author}</span>
                          </span>
                        )}
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTime} min read
                          </span>
                        )}
                      </div>
                    </header>
                    
                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed" itemProp="description">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-medium hover:bg-emerald-100 transition-all duration-200 group-hover:shadow-md"
                    >
                      Read Article
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
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  View All Health Articles
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </section>

          {/* Newsletter Signup */}
          {/* <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl text-center text-white mb-16">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Healthy, Stay Informed
              </h2>
              <p className="text-xl mb-8 text-emerald-100">
                Get weekly health tips, nutrition insights, and wellness strategies delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                  aria-label="Email address"
                />
                <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-emerald-200 mt-4">
                Join 50,000+ health enthusiasts. Unsubscribe anytime.
              </p>
            </div>
          </section> */}

        </main>
      </div>
    </>
  )
}