import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { getBlogPosts } from '../lib/firestore'
import type { BlogPost } from '../types'
import { format, parseISO } from 'date-fns'

const fallback: BlogPost[] = [
  {
    id: '1',
    title: 'Best Pool Day in Pattaya — Come to Hemingways Lakeside',
    slug: 'best-pool-day-pattaya',
    excerpt: 'Why Hemingways Lakeside is the best spot for a pool day in East Pattaya. Food, drinks, and a proper swimming pool.',
    content: '',
    publishedAt: '2026-05-01',
    author: 'Hemingways Team',
    tags: ['pool', 'pattaya'],
  },
  {
    id: '2',
    title: 'Kids Birthday Party Ideas in Pattaya 2026',
    slug: 'kids-birthday-party-pattaya',
    excerpt: 'Planning a kids birthday party in Pattaya? Here\'s why a pool party at Hemingways Lakeside is the perfect choice.',
    content: '',
    publishedAt: '2026-04-15',
    author: 'Hemingways Team',
    tags: ['kids', 'birthday', 'parties'],
  },
]

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(fallback)

  useEffect(() => {
    getBlogPosts()
      .then(data => {
        const published = data.filter(p => p.status !== 'draft')
        if (published.length) setPosts(published)
      })
      .catch(() => {})
  }, [])

  return (
    <div>
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#0d1a0d] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">News & Stories</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">The Blog</h1>
          <p className="text-gray-400 text-lg">Events, news, and stories from Hemingways Lakeside.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug || post.id}`}
              className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden hover:border-[#c9a84c]/20 transition-colors group"
            >
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-white font-bold text-lg mb-2 group-hover:text-[#c9a84c] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} />
                    {format(parseISO(post.publishedAt), 'd MMM yyyy')}
                  </div>
                  <div className="flex items-center gap-1 text-[#c9a84c] group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
