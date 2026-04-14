import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, MessageCircle, FileText, Users, Settings, LogOut, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Stats {
  messages: number;
  projects: number;
  applications: number;
  members: number;
}

const statsIcons = {
  messages: MessageCircle,
  projects: FileText,
  applications: Users,
  members: BarChart3,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ messages: 0, projects: 0, applications: 0, members: 0 });
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/messages', { headers: { Authorization: `Bearer ${token}` } });
      // Similar for others...
      // Stub for now
      setStats({ messages: 3, projects: 2, applications: 5, members: 8 });
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-black p-4">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="fixed left-4 top-4 bottom-4 rounded-2xl glass-dark border border-white/20 shadow-2xl backdrop-blur-xl z-40"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <motion.h2
              className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              animate={{ opacity: sidebarOpen ? 1 : 0 }}
            >
              Admin Panel
            </motion.h2>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group ${
                  activeNav === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-white/50 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${activeNav === item.id ? 'text-white' : 'group-hover:text-blue-500'}`} />
                <span className={`${sidebarOpen ? 'block' : 'hidden'} text-left flex-1 font-medium`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-white/10">
            <motion.button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <LogOut className="w-5 h-5" />
              <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>Logout</span>
            </motion.button>
          </div>
        </div>

        {/* Toggle button */}
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </motion.button>
      </motion.aside>

      {/* Overlay for small screens */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className={`transition-margin ml-16 lg:ml-${sidebarOpen ? '72' : '20'} mt-16`}>
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(stats).map(([key, value]) => {
            const Icon = statsIcons[key as keyof Stats];
            return (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-xl group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center group-hover:rotate-3 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">New {key}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-violet-600 w-[60%] rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div className="glass rounded-2xl p-8 border border-white/20 shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">John Doe - New project inquiry</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div className="glass rounded-2xl p-8 border border-white/20 shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'View Messages', icon: MessageCircle, color: 'blue' },
                { label: 'Pending Projects', icon: FileText, color: 'violet' },
                { label: 'New Applications', icon: Users, color: 'green' },
                { label: 'Add Member', icon: Users, color: 'indigo' },
              ].map((action, i) => (
                <motion.button
                  key={i}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all bg-white/50 dark:bg-gray-800/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-${action.color}-500/10 group-hover:bg-${action.color}-500/20 flex items-center justify-center p-2`}>
                    <action.icon className={`w-5 h-5 text-${action.color}-500`} />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
