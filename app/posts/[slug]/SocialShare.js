'use client'

import { useState } from 'react'
import { 
  Share2, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy,
  Check
} from 'lucide-react'

export default function SocialShare({ post }) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedInstagram, setCopiedInstagram] = useState(false)
  
  const postUrl = `https://yourdomain.com/posts/${post.slug}`
  const shareText = `Check out this article: ${post.title}`
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = postUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopiedInstagram(true)
      setTimeout(() => setCopiedInstagram(false), 3000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = postUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedInstagram(true)
      setTimeout(() => setCopiedInstagram(false), 3000)
    }
  }

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + postUrl)}`,
      color: 'hover:bg-green-500 hover:text-white',
      bgColor: 'bg-green-50 text-green-600',
      action: 'link'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'hover:bg-pink-500 hover:text-white',
      bgColor: 'bg-pink-50 text-pink-600',
      action: 'instagram'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-600',
      action: 'link'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-sky-500 hover:text-white',
      bgColor: 'bg-sky-50 text-sky-600',
      action: 'link'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
      color: 'hover:bg-blue-700 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-700',
      action: 'link'
    },
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'hover:bg-gray-500 hover:text-white',
      bgColor: 'bg-gray-50 text-gray-600',
      action: 'copy'
    }
  ]

  const handleShare = (link) => {
    if (link.action === 'copy') {
      handleCopyLink()
    } else if (link.action === 'instagram') {
      handleInstagramShare()
    } else if (link.action === 'link') {
      window.open(link.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="sticky top-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Share2 className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Share this article</h3>
      </div>
      
      <div className="space-y-3">
        {shareLinks.map((link) => {
          const Icon = link.icon
          let displayText = link.name
          let showCheck = false
          
          if (link.action === 'copy' && copiedLink) {
            displayText = 'Link Copied!'
            showCheck = true
          } else if (link.action === 'instagram' && copiedInstagram) {
            displayText = 'Link copied! Share on Instagram'
            showCheck = true
          }
          
          return (
            <button
              key={link.name}
              onClick={() => handleShare(link)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${link.bgColor} ${link.color} border border-transparent hover:border-current hover:shadow-md group`}
            >
              {showCheck ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              <span className="font-medium text-sm">{displayText}</span>
            </button>
          )
        })}
      </div>
      
      {copiedInstagram && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            Link copied! Open Instagram and paste it in your story or post.
          </p>
        </div>
      )}
    </div>
  )
}