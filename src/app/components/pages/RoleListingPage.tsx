import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Filter, MapPin, DollarSign, Calendar, Users, Star, Heart, Send
} from 'lucide-react';

export const RoleListingPage = () => {
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null);
  const [filters, setFilters] = useState({
    age: '',
    gender: '',
    emotion: '',
    language: '',
  });

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
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Open Casting Calls
            </span>
          </h1>
          <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-lg">
            Find your next big opportunity
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white dark:text-white light:text-zinc-950">
                  Filters
                </h3>
              </div>

              <div className="space-y-6">
                {/* Age Range */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-3">
                    Age Range
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['18-25', '26-35', '36-50', '50+'].map((age) => (
                      <motion.button
                        key={age}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, age })}
                        className={`px-3 py-2 rounded-xl text-sm transition-all ${
                          filters.age === age
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                        }`}
                      >
                        {age}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-3">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Male', 'Female', 'Any'].map((gender) => (
                      <motion.button
                        key={gender}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, gender })}
                        className={`px-3 py-2 rounded-xl text-sm transition-all ${
                          filters.gender === gender
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                        }`}
                      >
                        {gender}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Emotion Tags */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-3">
                    Required Emotion
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Drama', 'Comedy', 'Action', 'Romance'].map((emotion) => (
                      <motion.button
                        key={emotion}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters({ ...filters, emotion })}
                        className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                          filters.emotion === emotion
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-500/30'
                            : 'bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30'
                        }`}
                      >
                        {emotion}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-3">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 border border-white/10 dark:border-white/10 light:border-zinc-900/10 text-white dark:text-white light:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All Languages</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-zinc-400 hover:text-white transition-colors"
                >
                  Clear Filters
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Role Listings */}
          <div className="lg:col-span-3 space-y-6">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedRole(role)}
                className="group cursor-pointer p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white dark:text-white light:text-zinc-950">
                        {role.title}
                      </h3>
                      {role.featured && (
                        <motion.span
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Star className="w-3 h-3 fill-white" />
                          Featured
                        </motion.span>
                      )}
                    </div>
                    <p className="text-lg text-zinc-400 mb-4">{role.production}</p>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-zinc-400 hover:text-pink-400 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <p className="text-zinc-400 mb-4 line-clamp-2">{role.description}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-sm text-zinc-400">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    {role.location}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-sm text-zinc-400">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    {role.deadline}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-sm text-zinc-400">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                    {role.compensation}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 text-sm text-zinc-400">
                    <Users className="w-4 h-4 text-purple-400" />
                    {role.applicants} applicants
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {role.requirements.map((req, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-xs text-purple-300"
                    >
                      {req}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                >
                  <Send className="w-4 h-4" />
                  Apply Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRole(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full p-8 rounded-3xl bg-zinc-900 border border-white/10"
            >
              <h2 className="text-3xl font-bold mb-4 text-white">
                Apply for {selectedRole.title}
              </h2>
              <p className="text-zinc-400 mb-6">{selectedRole.production}</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Select Your Video
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Dramatic Monologue</option>
                    <option>Comedy Scene</option>
                    <option>Action Sequence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Why are you perfect for this role?"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Upload Progress */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-400">Upload Progress</span>
                    <span className="text-sm font-semibold text-white">0%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                      initial={{ width: '0%' }}
                      animate={{ width: '0%' }}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRole(null)}
                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                  >
                    Submit Application
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const roles = [
  {
    title: 'Lead Character - Sarah Chen',
    production: 'DreamWorks Studios',
    description: 'Looking for a dynamic actress to portray the lead role of Sarah Chen, a tech entrepreneur navigating personal and professional challenges in Silicon Valley.',
    location: 'Los Angeles, CA',
    deadline: 'Apply by Feb 15',
    compensation: '$50k - $80k',
    applicants: 124,
    requirements: ['Female', '28-35', 'Drama', 'English'],
    featured: true,
  },
  {
    title: 'Supporting Role - Detective Marcus',
    production: 'Metro Pictures',
    description: 'Seeking a talented actor for a supporting detective role in an upcoming crime thriller series.',
    location: 'New York, NY',
    deadline: 'Apply by Feb 20',
    compensation: '$30k - $45k',
    applicants: 89,
    requirements: ['Male', '35-45', 'Drama', 'Action'],
    featured: false,
  },
  {
    title: 'Comic Relief - Best Friend',
    production: 'Indie Films Co',
    description: 'Looking for a naturally funny actor to play the comedic best friend in a romantic comedy feature film.',
    location: 'Atlanta, GA',
    deadline: 'Apply by Feb 25',
    compensation: '$20k - $30k',
    applicants: 156,
    requirements: ['Any', '25-35', 'Comedy', 'English'],
    featured: false,
  },
];
