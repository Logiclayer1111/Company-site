import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ChatBot from './components/ui/ChatBot'
import ScrollToTop from './components/ui/ScrollToTop'
import ErrorBoundary from './components/ui/ErrorBoundary'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectRequestPage from './pages/ProjectRequestPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import PageTransition from './components/ui/PageTransition'

export default function App() {
  const [darkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [darkMode])

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-dark-900 text-gray-100 font-sans">
        <Navbar />
        <ErrorBoundary>
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/request" element={<ProjectRequestPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
            </Routes>
          </PageTransition>
        </ErrorBoundary>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  )
}
