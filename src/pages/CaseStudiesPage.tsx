import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, ArrowRight, X, CheckCircle2 } from 'lucide-react'
import { caseStudies } from '../data'
import SectionHeader from '../components/ui/SectionHeader'

export default function CaseStudiesPage() {
  const [selected, setSelected] = useState<typeof caseStudies[0] | null>(null)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="tag mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
              Case Studies
            </span>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              Real Problems. <span className="gradient-text">Real Results.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Deep dives into how we've helped companies solve complex challenges and achieve measurable outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-900/60" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="tag text-xs">{cs.industry}</span>
                    <span className="tag text-xs">{cs.duration}</span>
                  </div>
                </div>
                <div className="p-8 lg:p-10">
                  <p className="text-sm text-blue-400 mb-2">{cs.client}</p>
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {cs.title}
                  </h2>

                  {/* Results grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {cs.results.map((r) => (
                      <div key={r.label} className="bg-white/5 rounded-xl p-3 text-center">
                        <div className="text-2xl font-black gradient-text">{r.metric}</div>
                        <div className="text-xs text-gray-400">{r.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cs.technologies.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{tech}</span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelected(cs)}
                      className="btn-primary text-sm"
                    >
                      Read Full Case Study <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="btn-outline text-sm">
                      <Download className="w-4 h-4" /> PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark rounded-2xl w-full max-w-2xl border border-white/10 my-8"
            >
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <p className="text-sm text-blue-400">{selected.client}</p>
                  <h3 className="text-xl font-bold text-white">{selected.title}</h3>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">The Challenge</h4>
                  <p className="text-gray-300 leading-relaxed">{selected.challenge}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">Our Solution</h4>
                  <p className="text-gray-300 leading-relaxed">{selected.solution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Results</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selected.results.map((r) => (
                      <div key={r.label} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">{r.metric}</div>
                          <div className="text-xs text-gray-400">{r.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button className="btn-primary flex-1 justify-center text-sm">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                  <button onClick={() => setSelected(null)} className="btn-outline text-sm">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
