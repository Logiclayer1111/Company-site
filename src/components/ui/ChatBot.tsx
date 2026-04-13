import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

type Message = { role: 'bot' | 'user'; text: string }

const botResponses: Record<string, string> = {
  default: "I'm NexaCore's AI assistant. I can help you explore our services, discuss your project, or connect you with our team. What are you looking to build?",
  hello: "Hey there! 👋 I'm here to help you find the right solution. Are you looking to build a web app, mobile app, AI system, or something else?",
  services: "We offer Web Development, Mobile Apps, AI/ML, Cloud & DevOps, Cybersecurity, UI/UX Design, Blockchain, and Data Engineering. Which area interests you most?",
  web: "Our web team builds with React, Next.js, Vue, and Node.js. We've delivered everything from MVPs to enterprise platforms. Want to see some examples?",
  mobile: "We build native iOS/Android and cross-platform apps with React Native and Flutter. Our apps have served millions of users. Tell me about your app idea!",
  ai: "Our AI practice covers custom ML models, LLM integrations, computer vision, and predictive analytics. What problem are you trying to solve with AI?",
  cloud: "We architect cloud infrastructure on AWS, GCP, and Azure with Kubernetes, CI/CD, and IaC. Are you migrating, scaling, or starting fresh?",
  price: "Project costs vary based on scope and complexity. Most projects range from $25K to $500K+. The best way to get an accurate estimate is to submit a project brief — it takes 2 minutes!",
  timeline: "Timelines depend on scope. MVPs typically take 6-12 weeks, while enterprise projects can run 3-12 months. We always provide a detailed timeline upfront.",
  contact: "You can reach us at hello@nexacore.io or call +1 (212) 555-0100. Or fill out our contact form and we'll respond within 24 hours.",
  start: "Ready to kick things off? Head to our Project Request page and fill out a brief. Our team will review it and get back to you within 24 hours with a proposal.",
}

function getBotReply(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return botResponses.hello
  if (lower.includes('service') || lower.includes('what do you')) return botResponses.services
  if (lower.includes('web') || lower.includes('website') || lower.includes('react')) return botResponses.web
  if (lower.includes('mobile') || lower.includes('app') || lower.includes('ios') || lower.includes('android')) return botResponses.mobile
  if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('ml')) return botResponses.ai
  if (lower.includes('cloud') || lower.includes('devops') || lower.includes('aws')) return botResponses.cloud
  if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('how much')) return botResponses.price
  if (lower.includes('time') || lower.includes('long') || lower.includes('when') || lower.includes('deadline')) return botResponses.timeline
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) return botResponses.contact
  if (lower.includes('start') || lower.includes('begin') || lower.includes('project') || lower.includes('hire')) return botResponses.start
  return botResponses.default
}

const quickReplies = ['Our Services', 'Project Cost', 'Timeline', 'Start a Project']

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: botResponses.default },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { role: 'bot', text: getBotReply(text) }])
    }, 900)
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-2xl bg-blue-500/30 animate-ping" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-dark rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-gray-200/50 dark:border-transparent"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">NexaCore AI</p>
                <p className="text-xs text-blue-100">Always online · Instant replies</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'bot' ? 'bg-blue-500/20' : 'bg-violet-500/20'
                  }`}>
                    {msg.role === 'bot' ? <Bot className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4 text-violet-400" />}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'bot'
                      ? 'bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-gray-100 dark:bg-white/5 px-3 py-2 rounded-xl flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 dark:border-white/5 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask me anything..."
                className="flex-1 text-sm py-2 px-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
              />
              <button
                onClick={() => sendMessage(input)}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
