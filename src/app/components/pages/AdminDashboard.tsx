import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  Users, UserCheck, AlertTriangle, TrendingUp, Activity,
  ShieldCheck, Eye, MessageSquare, BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const AdminDashboard = () => {
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = 15234 / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAnimatedCount(Math.floor(increment * currentStep));
      if (currentStep >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-zinc-950 light:bg-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white dark:text-white light:text-zinc-950">
            Admin <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-lg">
            Platform overview and moderation tools
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {adminStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-6 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 overflow-hidden"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
              />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  {stat.alert && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-red-500"
                    />
                  )}
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                  className="text-3xl font-bold text-white dark:text-white light:text-zinc-950 mb-1"
                >
                  {i === 0 ? animatedCount.toLocaleString() : stat.value}
                </motion.div>
                <div className="text-sm text-zinc-400 mb-2">{stat.label}</div>
                <div className={`text-xs flex items-center gap-1 ${
                  stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend} vs last month
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
          >
            <h3 className="text-xl font-bold mb-6 text-white dark:text-white light:text-zinc-950">
              User Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    border: '1px solid #3F3F46',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="actors" stroke="#A855F7" strokeWidth={3} dot={{ fill: '#A855F7', r: 6 }} />
                <Line type="monotone" dataKey="directors" stroke="#EC4899" strokeWidth={3} dot={{ fill: '#EC4899', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Application Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
          >
            <h3 className="text-xl font-bold mb-6 text-white dark:text-white light:text-zinc-950">
              Application Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    border: '1px solid #3F3F46',
                    borderRadius: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 mb-8"
        >
          <h3 className="text-xl font-bold mb-6 text-white dark:text-white light:text-zinc-950">
            Platform Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181B',
                  border: '1px solid #3F3F46',
                  borderRadius: '12px',
                }}
              />
              <Legend />
              <Bar dataKey="views" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="applications" fill="#A855F7" radius={[8, 8, 0, 0]} />
              <Bar dataKey="messages" fill="#EC4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Flagged Content Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white dark:text-white light:text-zinc-950">
              Flagged Content Review
            </h3>
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-sm font-semibold">
              {flaggedContent.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {flaggedContent.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 hover:bg-white/10 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                  item.type === 'chat' ? 'from-blue-600 to-blue-500' : 'from-purple-600 to-purple-500'
                } flex items-center justify-center`}>
                  {item.type === 'chat' ? (
                    <MessageSquare className="w-5 h-5 text-white" />
                  ) : (
                    <Eye className="w-5 h-5 text-white" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white dark:text-white light:text-zinc-950">
                      {item.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      item.severity === 'high'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : item.severity === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Reported by {item.reporter} • {item.date}
                  </p>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30"
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const adminStats = [
  {
    icon: Users,
    label: 'Total Users',
    value: '15.2K',
    trend: '+12%',
    gradient: 'from-blue-600 to-blue-500',
    alert: false,
  },
  {
    icon: UserCheck,
    label: 'Verified Users',
    value: '12.8K',
    trend: '+8%',
    gradient: 'from-green-600 to-green-500',
    alert: false,
  },
  {
    icon: Activity,
    label: 'Active Sessions',
    value: '3.2K',
    trend: '+15%',
    gradient: 'from-purple-600 to-purple-500',
    alert: false,
  },
  {
    icon: AlertTriangle,
    label: 'Pending Reports',
    value: '7',
    trend: '-5%',
    gradient: 'from-red-600 to-red-500',
    alert: true,
  },
];

const userGrowthData = [
  { month: 'Jan', actors: 800, directors: 120 },
  { month: 'Feb', actors: 1200, directors: 180 },
  { month: 'Mar', actors: 1600, directors: 240 },
  { month: 'Apr', actors: 2100, directors: 310 },
  { month: 'May', actors: 2800, directors: 420 },
  { month: 'Jun', actors: 3500, directors: 550 },
];

const applicationStatusData = [
  { name: 'Applied', value: 45, color: '#A855F7' },
  { name: 'Shortlisted', value: 30, color: '#EC4899' },
  { name: 'Selected', value: 15, color: '#22C55E' },
  { name: 'Rejected', value: 10, color: '#EF4444' },
];

const activityData = [
  { day: 'Mon', views: 2400, applications: 1200, messages: 800 },
  { day: 'Tue', views: 1800, applications: 980, messages: 600 },
  { day: 'Wed', views: 3200, applications: 1600, messages: 1200 },
  { day: 'Thu', views: 2800, applications: 1400, messages: 900 },
  { day: 'Fri', views: 3800, applications: 1900, messages: 1400 },
  { day: 'Sat', views: 1600, applications: 800, messages: 500 },
  { day: 'Sun', views: 1400, applications: 700, messages: 450 },
];

const flaggedContent = [
  {
    type: 'chat',
    title: 'Inappropriate Message',
    reporter: 'Actor #2341',
    date: '2 hours ago',
    severity: 'high',
  },
  {
    type: 'profile',
    title: 'Suspicious Profile Activity',
    reporter: 'Director #8742',
    date: '5 hours ago',
    severity: 'medium',
  },
  {
    type: 'chat',
    title: 'Spam Report',
    reporter: 'Actor #5621',
    date: '1 day ago',
    severity: 'low',
  },
];
