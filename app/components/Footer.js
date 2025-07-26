import Link from 'next/link'
export default function Footer() {
  return (
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
  );
}
