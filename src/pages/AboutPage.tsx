import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Target, Eye, Heart, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { teamMembers, companyTimeline } from '../data'
import SectionHeader from '../components/ui/SectionHeader'

const values = [
  { icon: Target, title: 'Mission', text: 'To empower businesses with technology that creates real, measurable impact — from early-stage startups to global enterprises.' },
  { icon: Eye, title: 'Vision', text: 'A world where every great idea has access to world-class engineering. We\'re building the technology partner that makes that possible.' },
  { icon: Heart, title: 'Values', text: 'Transparency, craftsmanship, and relentless curiosity. We treat every project as if it were our own product.' },
]

export default function AboutPage() {
  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true })

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="tag mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
              About NexaCore
            </span>
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              We're a Team of <span className="gradient-text">Builders</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Founded in 2018 by James Markov, NexaCore has grown from a 3-person startup to a 50+ strong team of engineers, designers, and strategists. We've delivered 200+ projects across 20+ industries — and we're just getting started.
            </p>
            <Link to="/request" className="btn-primary">
              Work With Us <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 border border-white/5 hover:border-blue-500/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5">
                <v.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
              <p className="text-gray-400 leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="The Team"
            title="Meet the "
            highlight="Minds Behind NexaCore"
            subtitle="A diverse team of engineers, designers, and strategists united by a passion for building great software."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden group border border-white/5 hover:border-blue-500/20 transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />
                  {/* Social overlay */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={member.linkedin} className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                    <a href={member.twitter} className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-blue-400 mb-2">{member.role}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          badge="Our Journey"
          title="From Startup to "
          highlight="Global Partner"
          subtitle="Seven years of growth, milestones, and relentless execution."
        />
        <div ref={timelineRef} className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-transparent" />
          <div className="space-y-8">
            {companyTimeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 pl-4"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-blue-500/30 z-10 relative">
                    {i + 1}
                  </div>
                </div>
                <div className="glass rounded-xl p-5 flex-1 border border-white/5 hover:border-blue-500/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{item.year}</span>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{item.description}</p>
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
            Want to Join Our <span className="gradient-text">Team?</span>
          </h2>
          <p className="text-gray-400 mb-8">We're always looking for talented people who love building great software.</p>
          <Link to="/careers" className="btn-primary">
            View Open Positions <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
