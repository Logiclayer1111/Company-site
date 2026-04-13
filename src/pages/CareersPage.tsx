import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MapPin, Clock, Briefcase, ChevronDown, Upload, CheckCircle2, ArrowRight, Heart, Zap, Globe, Coffee } from 'lucide-react'
import { openPositions } from '../data'
import SectionHeader from '../components/ui/SectionHeader'

const culture = [
  { icon: Zap, title: 'Move Fast', desc: 'We ship weekly, iterate constantly, and trust our team to make decisions.' },
  { icon: Globe, title: 'Work Anywhere', desc: 'Fully remote-first with optional offices in NYC, London, and Singapore.' },
  { icon: Heart, title: 'People First', desc: 'Competitive salaries, equity, unlimited PTO, and top-tier health benefits.' },
  { icon: Coffee, title: 'Grow Together', desc: '$3K annual learning budget, conference tickets, and mentorship programs.' },
]

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)
  const [applyingTo, setApplyingTo] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: unknown) => {
    console.log(data)
    setSubmitted(true)
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="tag mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />
              We're Hiring
            </span>
            <h1 className="text-5xl lg:text-6xl font-black mb-6 max-w-3xl">
              Build the Future <span className="gradient-text">With Us</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Join a team of 200+ engineers, designers, and strategists building products used by millions. Remote-first, equity-backed, and mission-driven.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          badge="Life at NexaCore"
          title="Why People "
          highlight="Love Working Here"
          subtitle="We've built a culture where great people do their best work."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {culture.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">{c.title}</h3>
              <p className="text-sm text-gray-400">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Open Roles"
            title="Current "
            highlight="Openings"
            subtitle={`${openPositions.length} open positions across engineering, design, and more.`}
          />
          <div className="space-y-4 max-w-4xl mx-auto">
            {openPositions.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                        <span className="tag text-xs">{job.department}</span>
                        <span className="tag text-xs">{job.level}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${expandedJob === job.id ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/5 pt-4">
                        <p className="text-gray-400 mb-4">{job.description}</p>
                        <div className="mb-5">
                          <p className="text-sm font-semibold text-white mb-2">Requirements</p>
                          <ul className="space-y-1.5">
                            {job.requirements.map((req) => (
                              <li key={req} className="flex items-center gap-2 text-sm text-gray-400">
                                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button
                          onClick={() => setApplyingTo(job.id)}
                          className="btn-primary text-sm"
                        >
                          Apply Now <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {applyingTo && !submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setApplyingTo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark rounded-2xl p-8 w-full max-w-lg border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-1">
                Apply — {openPositions.find(j => j.id === applyingTo)?.title}
              </h3>
              <p className="text-sm text-gray-400 mb-6">We'll review your application and get back to you within 5 business days.</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Name *</label>
                    <input {...register('name', { required: true })} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Email *</label>
                    <input {...register('email', { required: true })} placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">LinkedIn / Portfolio</label>
                  <input {...register('portfolio')} placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Why NexaCore?</label>
                  <textarea {...register('message')} rows={3} placeholder="Tell us why you'd be a great fit..." />
                </div>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500/30 transition-colors">
                  <Upload className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Upload Resume (PDF)</p>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setApplyingTo(null)} className="btn-outline flex-1 justify-center">Cancel</button>
                  <button type="submit" className="btn-primary flex-1 justify-center">Submit Application</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => { setSubmitted(false); setApplyingTo(null) }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glass-dark rounded-2xl p-10 text-center max-w-sm border border-white/10"
            >
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Application Sent!</h3>
              <p className="text-gray-400 text-sm">We'll review your application and reach out within 5 business days.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
