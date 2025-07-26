import Link from 'next/link'

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Sorry, we couldn't find the page you're looking for. 
        It might have been moved, deleted, or you entered the wrong URL.
      </p>
      <div className="space-y-4">
        <Link 
          href="/"
          className="btn btn-primary inline-block"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}