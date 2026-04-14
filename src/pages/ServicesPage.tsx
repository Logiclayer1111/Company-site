import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe, Smartphone, Brain, Cloud, Shield, Palette, ArrowRight, CheckCircle2 } from 'lucide-react'
import { services } from '../data'
import SectionHeader from '../components/ui/SectionHeader'

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Brain, Cloud, Shield, Palette,
  Link: Globe, BarChart3: Brain,
}

const process = [
  { step: '01', title: 'Discovery', desc: 'We deep-dive into your business goals, technical requirements, and user needs to define the perfect solution.' },
  { step: '02', title: 'Architecture', desc: 'Our architects design a scalable, secure system blueprint tailored to your specific use case and growth trajectory.' },
  { step: '03', title: 'Development', desc: 'Agile sprints with weekly demos. You stay in the loop at every stage with full transparency into progress.' },
  { step: '04', title: 'Launch & Scale', desc: 'We deploy, monitor, and optimize. Post-launch support ensures your product performs flawlessly at any scale.' },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="tag mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
              Our Services
            </span>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              Everything You Need to <span className="gradient-text">Build & Scale</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We provide top-notch services in the digital world. Regardless of the size of your company, we don’t discriminate. <br/> Our top priority is to provide you with custom solutions and give you the best return on your investment. Creating a digital image is very time-consuming and can be a hassle in the digitally transforming world, but we keep an eye on ongoing trends, social media development, and your target audience to make things easy for you and your company’s growth and profitability. At times, our team of experts deals with multiple companies, so we guide you on industry best practices and how your company can grow at a fast pace. Our packages include all of your digital services, from ranking your website to securing your data through blockchain services. We know how to create a display that suits your website and how to make a social media appearance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-blue-500/20 transition-all group"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${
                    service.color === 'blue' ? 'from-blue-500/20 to-blue-600/10' :
                    service.color === 'violet' ? 'from-violet-500/20 to-violet-600/10' :
                    'from-cyan-500/20 to-cyan-600/10'
                  } group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${
                      service.color === 'blue' ? 'text-blue-400' :
                      service.color === 'violet' ? 'text-violet-400' : 'text-cyan-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-5 max-w-2xl">{service.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/request" className="btn-outline flex-shrink-0 text-sm">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="How We Work"
            title="Our "
            highlight="Delivery Process"
            subtitle="A proven methodology that delivers results on time, every time."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-blue-500/30 to-transparent z-0" />
                )}
                <div className="glass rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 transition-colors relative z-10">
                  <div className="text-4xl font-black gradient-text mb-4">{p.step}</div>
                  <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-black mb-4">
            Not Sure Which Service <span className="gradient-text">You Need?</span>
          </h2>
          <p className="text-gray-400 mb-8">Chat with our AI assistant or schedule a free 30-minute consultation with our team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Book a Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/request" className="btn-outline">
              Submit a Brief
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
