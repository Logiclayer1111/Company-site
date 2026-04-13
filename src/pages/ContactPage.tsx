import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Clock, CheckCircle2, ArrowRight, Send } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@LogicPulse.io', href: 'mailto:hello@LogicPulse.io' },
  { icon: Phone, label: 'Phone', value: '+1 (212) 555-0100', href: 'tel:+12125550100' },
  { icon: MapPin, label: 'Offices', value: 'Warsaw · London · Singapore', href: '#' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: '#' },
]

export default function ContactPage() {
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="tag mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
              Get in Touch
            </span>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              Let's Start a <span className="gradient-text">Conversation</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Have a project in mind? A question? Or just want to say hi? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="glass rounded-2xl p-5 flex items-center gap-4 border border-white/5 hover:border-blue-500/20 transition-all group block"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-white">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <div className="glass rounded-2xl overflow-hidden border border-white/5 h-48 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-dark-900 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">LogicPulse - Warsaw, Poland</p>
                  <p className="text-xs text-black font-mono">52.2297° N, 21.0122° E</p>
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.099947!2d21.00778!3d52.22877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c0c1e!2zTmV4YUNvcmUgU3RhcmkgU2NlbmEgLSBXYXJzYXcsIFBvbGFuZA!5e0!3m2!1sen!2sus!4v172!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{border:0}}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LogicPulse Warsaw Office Location"
              />
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-10" />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="glass rounded-2xl p-12 text-center border border-white/5 h-full flex flex-col items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-8 border border-white/5 space-y-5">
                <h2 className="text-xl font-bold text-white">Send a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Name *</label>
                    <input {...register('name', { required: true })} placeholder="Your name" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">Required</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email *</label>
                    <input {...register('email', { required: true })} placeholder="your@email.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">Required</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Company</label>
                  <input {...register('company')} placeholder="Your company" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject *</label>
                  <input {...register('subject', { required: true })} placeholder="What's this about?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Message *</label>
                  <textarea {...register('message', { required: true })} rows={5} placeholder="Tell us more..." />
                  {errors.message && <p className="text-red-400 text-xs mt-1">Required</p>}
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-4">
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
