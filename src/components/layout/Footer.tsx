import { Link } from 'react-router-dom'
import { Zap, Twitter, Linkedin, Github, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Case Studies', path: '/case-studies' },
  ],
  Services: [
    { label: 'Web Development', path: '/services' },
    { label: 'Mobile Apps', path: '/services' },
    { label: 'AI & Machine Learning', path: '/services' },
    { label: 'Cloud & DevOps', path: '/services' },
    { label: 'Cybersecurity', path: '/services' },
  ],
  Resources: [
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
    { label: 'Start a Project', path: '/request' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-gray-50 dark:bg-dark-800 border-t border-gray-200 dark:border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">LogicPulse</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Building future-ready digital products for startups and enterprises. From idea to scale — we make it happen.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stay in the loop</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 text-sm py-2.5 px-3 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                />
                <button className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="mailto:hello@LogicPulse.io" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Mail className="w-4 h-4" /> hello@LogicPulse.io
            </a>
            <a href="tel:+12125550100" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Phone className="w-4 h-4" /> +1 (212) 555-0100
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Warsaw · London · Singapore
            </span>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} LogicPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
