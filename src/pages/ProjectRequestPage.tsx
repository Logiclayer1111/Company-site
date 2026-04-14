import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { CheckCircle2, Upload, Sparkles, ArrowRight, Clock, Shield, Users } from 'lucide-react'

type FormData = {
  name: string
  email: string
  company: string
  phone: string
  service: string
  budget: string
  timeline: string
  description: string
  goals: string
}

const services = ['Web Development', 'Mobile App', 'AI / Machine Learning', 'Cloud & DevOps', 'Cybersecurity', 'UI/UX Design', 'Blockchain / Web3', 'Data Engineering', 'Other']
const budgets = ['< $10K', '$10K – $25K', '$25K – $50K', '$50K – $100K', '$100K – $250K', '$250K+']
const timelines = ['ASAP', '1–3 months', '3–6 months', '6–12 months', 'Flexible']

const perks = [
  { icon: Clock, title: '24h Response', desc: 'We review every brief within 24 hours and respond with a tailored proposal.' },
  { icon: Shield, title: 'NDA Available', desc: 'We sign NDAs before any technical discussions to protect your idea.' },
  { icon: Users, title: 'Dedicated Team', desc: 'You get a dedicated project manager and engineering team from day one.' },
]

export default function ProjectRequestPage() {
  const [submitted, setSubmitted] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()

  const selectedService = watch('service')

  const aiSuggestions: Record<string, string> = {
    'Web Development': '💡 For web projects, consider sharing your target audience, expected traffic, and any existing tech stack.',
    'Mobile App': '💡 Mention whether you need iOS, Android, or both. Include any third-party integrations like payments or maps.',
    'AI / Machine Learning': '💡 Describe the data you have available and the specific problem you want AI to solve.',
    'Cloud & DevOps': '💡 Share your current infrastructure setup and the main pain points you\'re experiencing.',
    'Cybersecurity': '💡 Mention your compliance requirements (SOC2, ISO 27001, HIPAA) and current security posture.',
  }

  const handleServiceChange = (service: string) => {
    setAiSuggestion(aiSuggestions[service] || '')
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">Project Brief Received!</h2>
          <p className="text-gray-400 mb-8">
            Thanks for reaching out. Our team will review your brief and get back to you within 24 hours with a tailored proposal.
          </p>
          <a href="/" className="btn-primary">
            Back to Home <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="tag mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
              Start a Project
            </span>
            <h1 className="text-5xl lg:text-6xl font-black mb-4">
              Let's Build <span className="gradient-text">Something Great</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Fill out the brief below and we'll get back to you within 24 hours with a proposal.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-8 border border-white/5 space-y-6">
              <h2 className="text-xl font-bold text-white mb-2">Project Brief</h2>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
                  <input {...register('name', { required: true })} placeholder="John Smith" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Work Email *</label>
                  <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="john@company.com" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">Valid email required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Company</label>
                  <input {...register('company')} placeholder="Acme Inc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone</label>
                  <input {...register('phone')} placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Service Needed *</label>
                <select
                  {...register('service', { required: true })}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 w-full"
                >
                  <option value="">Select a service...</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="text-red-400 text-xs mt-1">Required</p>}
                {/* AI suggestion */}
                {aiSuggestion && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-300">{aiSuggestion}</p>
                  </motion.div>
                )}
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Budget Range *</label>
                  <select {...register('budget', { required: true })} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 w-full">
                    <option value="">Select budget...</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Timeline</label>
                  <select {...register('timeline')} className="bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 w-full">
                    <option value="">Select timeline...</option>
                    {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Project Description *</label>
                <textarea
                  {...register('description', { required: true })}
                  rows={4}
                  placeholder="Describe your project, the problem you're solving, and any specific requirements..."
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">Required</p>}
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Success Metrics / Goals</label>
                <textarea
                  {...register('goals')}
                  rows={3}
                  placeholder="What does success look like? (e.g., 10K users in 6 months, 99.9% uptime, 2x conversion rate)"
                />
              </div>

              {/* File upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Attachments (optional)</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-blue-500/30 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Drop files here or <span className="text-blue-400">browse</span></p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOCX, PNG, JPG up to 10MB</p>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                Submit Project Brief <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {perks.map((perk, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <perk.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-1">{perk.title}</h3>
                <p className="text-sm text-gray-400">{perk.desc}</p>
              </div>
            ))}

            <div className="glass rounded-2xl p-6 border border-blue-500/20 bg-blue-500/5">
              <p className="text-sm font-semibold text-blue-400 mb-2">🔒 Your information is safe</p>
              <p className="text-xs text-gray-400">We never share your project details with third parties. NDAs available upon request.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
