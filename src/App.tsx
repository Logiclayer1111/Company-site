import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
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
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
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
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/*" element={<ProtectedRoute />}>
                    <Route index element={<AdminDashboard />} />
                  </Route>
                </Routes>
              </PageTransition>
            </ErrorBoundary>
            <Footer />
            <ChatBot />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}
