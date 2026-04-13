import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Tag, Share2, ArrowRight, Search } from 'lucide-react'
import { blogPosts } from '../data'
import SectionHeader from '../components/ui/SectionHeader'

const categories = ['All', 'DevOps', 'AI/ML', 'Security', 'Web Dev', 'Data', 'Blockchain']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = blogPosts[0]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="tag mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
              The NexaCore Blog
            </span>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              Insights from the <span className="gradient-text">Engineering Trenches</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Deep dives, tutorials, and perspectives on modern software engineering from our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-900/50" />
              <span className="absolute top-4 left-4 tag">Featured</span>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="tag text-xs">{featured.category}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />{featured.readTime}
                </span>
                <span className="text-xs text-gray-500">{featured.date}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4">
                <button className="btn-primary text-sm">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg glass hover:bg-white/10 transition-colors">
                  <Share2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filters & Search */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'glass text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="pl-9 pr-4 py-2 text-sm w-64"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all group card-hover"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <span className="absolute top-3 left-3 tag text-xs">{post.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-gray-500">
                        <Tag className="w-3 h-3" />{tag}
                      </span>
                    ))}
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                    <Share2 className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No articles found matching your search.
          </div>
        )}
      </section>
    </div>
  )
}
