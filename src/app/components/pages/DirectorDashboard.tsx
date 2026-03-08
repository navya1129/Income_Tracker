import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Plus, Users, Star, Filter, TrendingUp, Check, X, Heart, MessageCircle
} from 'lucide-react';

export const DirectorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'recommendations' | 'shortlist' | 'roles'>('recommendations');

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-zinc-950 light:bg-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white dark:text-white light:text-zinc-950">
              Welcome, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Director Chen</span>
            </h1>
            <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-lg">
              42 new applications • 8 shortlisted candidates
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
          >
            <Plus className="w-5 h-5" />
            Post New Role
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {directorStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                  className="text-green-500 text-sm flex items-center gap-1"
                >
                  <TrendingUp className="w-4 h-4" />
                  {stat.trend}
                </motion.div>
              </div>
              <div className="text-3xl font-bold text-white dark:text-white light:text-zinc-950 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {(['recommendations', 'shortlist', 'roles'] as const).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Actor Recommendations Carousel */}
        {selectedTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-zinc-950">
                AI Recommended Talent
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-zinc-400 hover:text-white"
              >
                <Filter className="w-4 h-4" />
                Filters
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedActors.map((actor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="relative p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 overflow-hidden">
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"
                    />

                    <div className="relative">
                      {/* Avatar & Verified Badge */}
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-bold text-white">
                          {actor.initials}
                        </div>
                        {actor.verified && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center border-4 border-zinc-950 dark:border-zinc-950 light:border-white"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>

                      {/* Info */}
                      <h3 className="text-xl font-bold text-center mb-1 text-white dark:text-white light:text-zinc-950">
                        {actor.name}
                      </h3>
                      <p className="text-sm text-zinc-400 text-center mb-4">
                        {actor.age} • {actor.location}
                      </p>

                      {/* Match Score */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-white dark:text-white light:text-zinc-950">
                          {actor.matchScore}% Match
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {actor.skills.map((skill, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-xs text-purple-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white dark:text-white light:text-zinc-950">
                            {actor.videos}
                          </div>
                          <div className="text-xs text-zinc-500">Videos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white dark:text-white light:text-zinc-950">
                            {actor.projects}
                          </div>
                          <div className="text-xs text-zinc-500">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white dark:text-white light:text-zinc-950">
                            {actor.rating}
                          </div>
                          <div className="text-xs text-zinc-500">Rating</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Pass
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                        >
                          <Heart className="w-4 h-4" />
                          Shortlist
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Shortlist View */}
        {selectedTab === 'shortlist' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
          >
            <h2 className="text-2xl font-bold mb-6 text-white dark:text-white light:text-zinc-950">
              Shortlisted Candidates
            </h2>

            <div className="space-y-4">
              {shortlistedActors.map((actor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 hover:bg-white/10 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold text-white">
                    {actor.initials}
                    {actor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center border-2 border-zinc-950 dark:border-zinc-950 light:border-white">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-white dark:text-white light:text-zinc-950 mb-1">
                      {actor.name}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {actor.role} • Applied {actor.appliedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-white dark:text-white light:text-zinc-950">
                      {actor.matchScore}%
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-zinc-400 hover:text-white"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                    >
                      Select
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Active Roles */}
        {selectedTab === 'roles' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {activeRoles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white dark:text-white light:text-zinc-950 mb-2">
                      {role.title}
                    </h3>
                    <p className="text-sm text-zinc-400">{role.production}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    role.status === 'active'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}>
                    {role.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5">
                  <div>
                    <div className="text-2xl font-bold text-white dark:text-white light:text-zinc-950">
                      {role.applications}
                    </div>
                    <div className="text-xs text-zinc-500">Applications</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white dark:text-white light:text-zinc-950">
                      {role.shortlisted}
                    </div>
                    <div className="text-xs text-zinc-500">Shortlisted</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white dark:text-white light:text-zinc-950">
                      {role.selected}
                    </div>
                    <div className="text-xs text-zinc-500">Selected</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-zinc-400 hover:text-white transition-colors"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                  >
                    Review Applications
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const directorStats = [
  {
    icon: Users,
    label: 'Total Applications',
    value: '156',
    trend: '+12%',
    color: 'from-purple-600 to-purple-500',
  },
  {
    icon: Star,
    label: 'Shortlisted',
    value: '24',
    trend: '+8%',
    color: 'from-pink-600 to-pink-500',
  },
  {
    icon: Check,
    label: 'Selected',
    value: '8',
    trend: '+5%',
    color: 'from-green-600 to-green-500',
  },
  {
    icon: TrendingUp,
    label: 'Active Roles',
    value: '5',
    trend: '+2',
    color: 'from-blue-600 to-blue-500',
  },
];

const recommendedActors = [
  {
    name: 'Emma Rodriguez',
    initials: 'ER',
    age: 28,
    location: 'LA',
    matchScore: 95,
    verified: true,
    skills: ['Drama', 'Action', 'Comedy'],
    videos: 12,
    projects: 8,
    rating: 4.9,
  },
  {
    name: 'Marcus Chen',
    initials: 'MC',
    age: 32,
    location: 'NYC',
    matchScore: 92,
    verified: true,
    skills: ['Drama', 'Thriller'],
    videos: 15,
    projects: 12,
    rating: 4.8,
  },
  {
    name: 'Sofia Martinez',
    initials: 'SM',
    age: 25,
    location: 'LA',
    matchScore: 88,
    verified: true,
    skills: ['Comedy', 'Romance'],
    videos: 10,
    projects: 6,
    rating: 4.7,
  },
];

const shortlistedActors = [
  {
    name: 'James Wilson',
    initials: 'JW',
    role: 'Lead Role',
    appliedDate: '3 days ago',
    matchScore: 94,
    verified: true,
  },
  {
    name: 'Olivia Brown',
    initials: 'OB',
    role: 'Supporting',
    appliedDate: '5 days ago',
    matchScore: 91,
    verified: true,
  },
  {
    name: 'David Kim',
    initials: 'DK',
    role: 'Featured',
    appliedDate: '1 week ago',
    matchScore: 87,
    verified: false,
  },
];

const activeRoles = [
  {
    title: 'Lead Role - "Midnight Dreams"',
    production: 'DreamWorks Studios',
    status: 'active',
    applications: 42,
    shortlisted: 8,
    selected: 2,
  },
  {
    title: 'Supporting - "City Lights"',
    production: 'Metro Pictures',
    status: 'active',
    applications: 38,
    shortlisted: 6,
    selected: 1,
  },
  {
    title: 'Featured - "The Journey"',
    production: 'Indie Films Co',
    status: 'closing',
    applications: 28,
    shortlisted: 4,
    selected: 0,
  },
  {
    title: 'Ensemble - "Summer Tales"',
    production: 'Vista Productions',
    status: 'active',
    applications: 52,
    shortlisted: 10,
    selected: 3,
  },
];
