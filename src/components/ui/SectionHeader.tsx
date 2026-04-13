import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Props {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  center?: boolean
}

export default function SectionHeader({ badge, title, highlight, subtitle, center = true }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const parts = highlight ? title.split(highlight) : [title]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {badge && (
        <span className="tag mb-4 inline-flex">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5" />
          {badge}
        </span>
      )}
      <h2 className="section-title">
        {parts[0]}
        {highlight && <span className="gradient-text">{highlight}</span>}
        {parts[1]}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </motion.div>
  )
}
