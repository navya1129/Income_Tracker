import { motion } from 'motion/react';
import { useState } from 'react';
import {
  User, Video, BarChart, CheckCircle, Clock, Trophy,
  Upload, Play, Heart, Eye, MessageCircle
} from 'lucide-react';

export const ActorDashboard = () => {
  const [profileStrength] = useState(75);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

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
            Welcome back, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Sarah</span>
          </h1>
          <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-lg">
            You have 3 new casting opportunities waiting for you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Strength */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
            >
              <h3 className="text-xl font-bold mb-6 text-white dark:text-white light:text-zinc-950">
                Profile Strength
              </h3>

              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-zinc-800 dark:text-zinc-800 light:text-zinc-200"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 440' }}
                    animate={{ strokeDasharray: `${(profileStrength / 100) * 440} 440` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white dark:text-white light:text-zinc-950">
                      {profileStrength}%
                    </div>
                    <div className="text-sm text-zinc-400">Complete</div>
                  </motion.div>
                </div>
              </div>

              <div className="space-y-3">
                {profileTasks.map((task, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.completed
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : 'bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200'
                    }`}>
                      {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm ${
                      task.completed
                        ? 'text-white dark:text-white light:text-zinc-950'
                        : 'text-zinc-500'
                    }`}>
                      {task.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
            >
              <h3 className="text-xl font-bold mb-6 text-white dark:text-white light:text-zinc-950">
                Quick Stats
              </h3>
              <div className="space-y-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-white dark:text-white light:text-zinc-950">
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Portfolio & Applications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white dark:text-white light:text-zinc-950">
                  Video Portfolio
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {videos.map((video, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setHoveredVideo(i)}
                    onHoverEnd={() => setHoveredVideo(null)}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer"
                  >
                    {/* Video Thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50" />
                    
                    {/* Play Button Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredVideo === i ? 1 : 0 }}
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
                      >
                        <Play className="w-8 h-8 text-purple-600 ml-1" />
                      </motion.div>
                    </motion.div>

                    {/* Video Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h4 className="font-semibold text-white mb-2">{video.title}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {video.emotions.map((emotion, j) => (
                          <motion.span
                            key={j}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 rounded-full bg-purple-600/30 backdrop-blur-xl border border-purple-500/30 text-xs text-purple-300"
                          >
                            {emotion}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {video.likes}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Application Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
            >
              <h3 className="text-2xl font-bold mb-6 text-white dark:text-white light:text-zinc-950">
                Application Timeline
              </h3>

              <div className="space-y-4">
                {applications.map((app, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="relative pl-8 pb-6 border-l-2 border-zinc-800 dark:border-zinc-800 light:border-zinc-200 last:border-0"
                  >
                    <div className="absolute -left-2 top-0">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className={`w-4 h-4 rounded-full ${
                          app.status === 'selected'
                            ? 'bg-green-500'
                            : app.status === 'shortlisted'
                            ? 'bg-yellow-500'
                            : 'bg-purple-500'
                        }`}
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-white dark:text-white light:text-zinc-950 mb-1">
                            {app.title}
                          </h4>
                          <p className="text-sm text-zinc-400">{app.production}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'selected'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : app.status === 'shortlisted'
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 mb-2">{app.date}</p>
                      {app.status === 'selected' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Open Chat
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const profileTasks = [
  { label: 'Complete profile info', completed: true },
  { label: 'Upload headshot', completed: true },
  { label: 'Add 3+ videos', completed: true },
  { label: 'Verify ID', completed: true },
  { label: 'Add resume', completed: false },
];

const stats = [
  { icon: Eye, label: 'Profile Views', value: '245' },
  { icon: Video, label: 'Portfolio Videos', value: '8' },
  { icon: Trophy, label: 'Applications', value: '12' },
  { icon: MessageCircle, label: 'Active Chats', value: '2' },
];

const videos = [
  {
    title: 'Dramatic Monologue',
    emotions: ['Drama', 'Intense', 'Emotional'],
    views: '1.2k',
    likes: '234',
  },
  {
    title: 'Comedy Scene',
    emotions: ['Comedy', 'Lighthearted', 'Fun'],
    views: '856',
    likes: '189',
  },
  {
    title: 'Action Sequence',
    emotions: ['Action', 'Dynamic', 'Physical'],
    views: '2.1k',
    likes: '412',
  },
  {
    title: 'Romantic Scene',
    emotions: ['Romance', 'Tender', 'Intimate'],
    views: '943',
    likes: '267',
  },
];

const applications = [
  {
    title: 'Lead Role - "Midnight Dreams"',
    production: 'DreamWorks Studios',
    status: 'selected',
    date: '2 days ago',
  },
  {
    title: 'Supporting - "City Lights"',
    production: 'Metro Pictures',
    status: 'shortlisted',
    date: '5 days ago',
  },
  {
    title: 'Featured - "The Journey"',
    production: 'Indie Films Co',
    status: 'applied',
    date: '1 week ago',
  },
];
