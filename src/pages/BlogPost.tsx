import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getBlogPost, getBlogPostBySlug } from '../lib/firestore'
import type { BlogPost as BlogPostType } from '../types'
import { format, parseISO } from 'date-fns'

const setMeta = (post: BlogPostType) => {
  document.title = post.metaTitle || post.title
  let tag = document.querySelector('meta[name="description"]')
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'description')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', post.metaDescription || post.excerpt || '')
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    getBlogPostBySlug(slug)
      .then(p => p ?? getBlogPost(slug))
      .then(p => {
        setPost(p)
        if (p) setMeta(p)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
    return () => { document.title = 'Hemingways Lakeside' }
  }, [slug])

  if (loading) {
    return (
      <div className="pt-32 flex items-center justify-center min-h-screen bg-white">
        <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-32 text-center px-4 bg-white min-h-screen">
        <p className="text-[#5c5346] mb-4">Post not found.</p>
        <Link to="/blog" className="text-[#8a6d2f] hover:underline">← Back to Blog</Link>
      </div>
    )
  }

  const isHtml = /<\/?[a-z][\s\S]*>/i.test(post.content)

  return (
    <div>
      <section className="pt-32 pb-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#5c5346] hover:text-[#8a6d2f] text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-[#8a6d2f] bg-[#c9a84c]/15 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1a1512]">{post.title}</h1>
          <div className="flex items-center gap-4 text-[#5c5346] text-sm mb-8">
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
          {isHtml ? (
            <div
              className="blog-content text-[#3d372e] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="text-[#3d372e] leading-relaxed">
              {post.content.split('\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
