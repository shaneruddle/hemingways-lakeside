import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getBlogPost } from '../lib/firestore'
import type { BlogPost as BlogPostType } from '../types'
import { format, parseISO } from 'date-fns'

export default function BlogPost() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getBlogPost(id)
      .then(setPost)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="pt-32 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-32 text-center px-4">
        <p className="text-gray-500 mb-4">Post not found.</p>
        <Link to="/blog" className="text-[#c9a84c] hover:underline">← Back to Blog</Link>
      </div>
    )
  }

  return (
    <div>
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#c9a84c] text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              {format(parseISO(post.publishedAt), 'd MMMM yyyy')}
            </div>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="w-full rounded-2xl mb-8 object-cover max-h-80" />
          )}
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
            {post.content.split('\n').map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
