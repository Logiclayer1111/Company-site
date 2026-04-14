import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { projects } from '../data'
import SectionHeader from '../components/ui/SectionHeader'

const categories = ['All', 'Fintech', 'Healthcare', 'Logistics', 'EdTech', 'Blockchain', 'E-Commerce']

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="tag mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
              Portfolio
            </span>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              Work That <span className="gradient-text">Speaks for Itself</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              200+ projects delivered. Here's a selection of our most impactful work across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl overflow-hidden group border border-white/5 hover:border-blue-500/20 transition-all card-hover"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="tag text-xs">{project.category}</span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-blue-400 mb-1">{project.service}</p>
                  <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                  {/* Results */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.results.map((r) => (
                      <span key={r} className="text-xs px-2 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                        ✓ {r}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-dark-800/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-black mb-4">
            Want to Be Our Next <span className="gradient-text">Success Story?</span>
          </h2>
          <p className="text-gray-400 mb-8">Let's discuss your project and see how we can help you achieve your goals.</p>
          <Link to="/request" className="btn-primary">
            Start a Project <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
