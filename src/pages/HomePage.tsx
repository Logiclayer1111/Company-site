import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  ArrowRight, Play, Star, Globe, Smartphone, Brain, Cloud,
  Shield, Palette, ChevronLeft, ChevronRight, Quote
} from 'lucide-react'
import { services, projects, testimonials, clientLogos } from '../data'
import SectionHeader from '../components/ui/SectionHeader'
import AnimatedCounter from '../components/ui/AnimatedCounter'

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Brain, Cloud, Shield, Palette,
  Link: Globe, BarChart3: Globe,
}

const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Enterprise Clients' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 7, suffix: '+', label: 'Years of Excellence' },
]

const typingWords = ['Web Applications', 'Mobile Apps', 'AI Systems', 'Cloud Infrastructure', 'Digital Products']

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Typing animation
  useEffect(() => {
    const word = typingWords[wordIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!isDeleting && displayText.length < word.length) {
      timeout = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 80)
    } else if (!isDeleting && displayText.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40)
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % typingWords.length)
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`
        ctx.fill()
      })
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [])

  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true })

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="tag">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />
                Trusted by 50+ companies worldwide
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
            >
              We Build{' '}
              <span className="gradient-text">
                {displayText}
                <span className="typing-cursor" />
              </span>
              <br />
              <span className="text-gray-700 dark:text-gray-300">That Scale</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Draxilon is a full-service technology partner for startups and enterprises.
              From concept to production — we deliver software that drives real business outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/request" className="btn-primary text-base px-8 py-4">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/projects" className="btn-outline text-base px-8 py-4">
                <Play className="w-5 h-5" /> View Our Work
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center card-hover">
                <div className="text-4xl font-black gradient-text mb-1">
                  {statsInView && <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CLIENT LOGOS ── */}
      <section className="py-12 border-y border-gray-200 dark:border-white/5 bg-gray-50/80 dark:bg-dark-800/50 overflow-hidden">
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mb-8 uppercase tracking-widest">Trusted by innovative companies</p>
        <div className="flex gap-8 animate-[scroll_20s_linear_infinite]" style={{ width: 'max-content' }}>
          {[...clientLogos, ...clientLogos].map((client, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 glass rounded-xl flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                {client.logo}
              </div>
              <span className="text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          badge="What We Do"
          title="Services Built for "
          highlight="Modern Businesses"
          subtitle="End-to-end technology solutions — from design to deployment, we cover every layer of your digital stack."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.slice(0, 8).map((service, i) => {
            const Icon = iconMap[service.icon] || Globe
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 cursor-pointer group border border-white/5 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${
                  service.color === 'blue' ? 'from-blue-500/20 to-blue-600/10' :
                  service.color === 'violet' ? 'from-violet-500/20 to-violet-600/10' :
                  'from-cyan-500/20 to-cyan-600/10'
                } group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${
                    service.color === 'blue' ? 'text-blue-400' :
                    service.color === 'violet' ? 'text-violet-400' : 'text-cyan-400'
                  }`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{service.short}</p>
              </motion.div>
            )
          })}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline">
            Explore All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-24 bg-gray-50/50 dark:bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Work"
            title="Projects That "
            highlight="Make an Impact"
            subtitle="A selection of our most impactful work across industries and technologies."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden group card-hover border border-white/5 hover:border-blue-500/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                  <span className="absolute top-3 left-3 tag text-xs">{project.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/projects" className="btn-outline">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          badge="Client Stories"
          title="What Our "
          highlight="Clients Say"
          subtitle="Don't take our word for it — hear from the teams we've helped build great products."
        />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            key={testimonialIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-8 text-center border border-gray-200/50 dark:border-white/5"
          >
            <Quote className="w-10 h-10 text-blue-500/40 mx-auto mb-6" />
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-8 italic">
              "{testimonials[testimonialIndex].text}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[testimonialIndex].avatar}
                alt={testimonials[testimonialIndex].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">{testimonials[testimonialIndex].name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[testimonialIndex].role}</p>
              </div>
              <div className="flex gap-0.5 ml-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </motion.div>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-blue-500/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === testimonialIndex ? 'bg-blue-500 w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
            <button
              onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-blue-500/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-24 bg-gray-50/50 dark:bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Tech Stack"
            title="Technologies "
            highlight="We Master"
            subtitle="We leverage the best-in-class tools and frameworks to build performant, scalable, and future-proof digital products."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {([
              {
                category: 'Frontend',
                color: 'blue',
                items: [
                  { name: 'React',      icon: 'react' },
                  { name: 'Next.js',    icon: 'nextdotjs' },
                  { name: 'Vue.js',     icon: 'vuedotjs' },
                  { name: 'Angular',    icon: 'angular' },
                  { name: 'TypeScript', icon: 'typescript' },
                  { name: 'HTML',       icon: 'html5' },
                  { name: 'CSS',        icon: 'css' },
                  { name: 'Tailwind',   icon: 'tailwindcss' },
                ],
              },
              {
                category: 'Backend',
                color: 'violet',
                items: [
                  { name: 'Node.js',    icon: 'nodedotjs' },
                  { name: 'Python',     icon: 'python' },
                  { name: 'Laravel',    icon: 'laravel' },
                  { name: 'Django',     icon: 'django' },
                  { name: 'PHP',        icon: 'php' },
                  { name: 'GraphQL',    icon: 'graphql' },
                  { name: 'Express.js', icon: 'express' },
                ],
              },
              {
                category: 'Mobile',
                color: 'cyan',
                items: [
                  { name: 'React Native', icon: 'react' },
                  { name: 'Flutter',      icon: 'flutter' },
                  { name: 'Swift',        icon: 'swift' },
                  { name: 'Kotlin',       icon: 'kotlin' },
                ],
              },
              {
                category: 'Cloud',
                color: 'blue',
                items: [
                  { name: 'AWS',        icon: '__aws__' },
                  { name: 'Azure',      icon: '__azure__' },
                  { name: 'GCP',        icon: 'googlecloud' },
                  { name: 'Docker',     icon: 'docker' },
                  { name: 'Kubernetes', icon: 'kubernetes' },
                ],
              },
              {
                category: 'AI / ML',
                color: 'violet',
                items: [
                  { name: 'TensorFlow', icon: 'tensorflow' },
                  { name: 'PyTorch',    icon: 'pytorch' },
                  { name: 'OpenAI',     icon: 'openai' },
                ],
              },
              {
                category: 'Databases',
                color: 'cyan',
                items: [
                  { name: 'PostgreSQL', icon: 'postgresql' },
                  { name: 'MongoDB',    icon: 'mongodb' },
                  { name: 'Redis',      icon: 'redis' },
                  { name: 'MySQL',      icon: 'mysql' },
                ],
              },
            ] as { category: string; color: string; items: { name: string; icon: string }[] }[]).map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 transition-all duration-300"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  group.color === 'blue'
                    ? 'bg-blue-500/10 text-blue-400'
                    : group.color === 'violet'
                    ? 'bg-violet-500/10 text-violet-400'
                    : 'bg-cyan-500/10 text-cyan-400'
                }`}>
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech.name}
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium hover:bg-blue-500/10 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-default group/tech"
                    >
                      {tech.icon === '__aws__' ? (
                        <svg className="w-4 h-4 opacity-70 group-hover/tech:opacity-100 transition-opacity flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
                        </svg>
                      ) : tech.icon === '__azure__' ? (
                        <svg className="w-4 h-4 opacity-70 group-hover/tech:opacity-100 transition-opacity flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M13.05 4.24L6.56 18.05l-2.04.01 5.02-8.72-3.06-5.1zm.78 1.12l4.1 11.53-7.8 1.36 5.4-1.9-2.4-5.87z"/>
                        </svg>
                      ) : (
                        <img
                          src={`https://cdn.simpleicons.org/${tech.icon}`}
                          alt={tech.name}
                          className="w-4 h-4 opacity-70 group-hover/tech:opacity-100 transition-opacity flex-shrink-0"
                          style={{ filter: 'grayscale(30%)' }}
                        />
                      )}
                      {tech.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-600 opacity-90" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative px-8 py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Ready to Build Something Great?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Tell us about your project and we'll get back to you within 24 hours with a tailored proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/request"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-blue-600 bg-white hover:bg-blue-50 transition-colors shadow-xl"
              >
                Start a Project <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
