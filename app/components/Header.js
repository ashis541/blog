import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link 
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            My SEO Blog
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}