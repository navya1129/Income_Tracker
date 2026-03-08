import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Film, Shield, Sparkles, Users, Video, CheckCircle, Star } from 'lucide-react';
import { useRef } from 'react';

export const LandingPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-zinc-950 light:bg-white text-white dark:text-white light:text-zinc-950">
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-zinc-950 to-pink-900/20" />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
              y,
            }}
          />
          {/* Grain Texture */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }} />
        </div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-3xl">
                <Film className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Where Talent
            </span>
            <br />
            <span className="text-white dark:text-white light:text-zinc-950">Meets Opportunity</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-12 max-w-3xl mx-auto"
          >
            A premium, trust-first casting platform connecting actors and directors
            with cinematic precision and privacy at its core
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/actor">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(147, 51, 234, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Get Cast
                </span>
              </motion.button>
            </Link>

            <Link to="/director">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 text-white dark:text-white light:text-zinc-950 font-semibold hover:bg-white/10 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Find Talent
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8"
          >
            {[
              { icon: Shield, text: 'No Phone Numbers' },
              { icon: CheckCircle, text: 'Verified Professionals' },
              { icon: Sparkles, text: 'AI-Powered Matching' },
            ].map((badge, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
              >
                <badge.icon className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-zinc-300 dark:text-zinc-300 light:text-zinc-700">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-purple-400/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ height: ['0%', '40%', '0%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 bg-purple-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-20"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Built for the Industry
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-8 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 hover:bg-white/10 transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"
                />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white dark:text-white light:text-zinc-950">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-white light:text-zinc-950">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-8">
            Join thousands of professionals already using CastPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/actor">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
              >
                Join as Actor
              </motion.button>
            </Link>
            <Link to="/director">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-white/10 dark:bg-white/10 light:bg-zinc-900/10 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 text-white dark:text-white light:text-zinc-950 font-semibold"
              >
                Join as Director
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'No phone numbers required. Your personal information stays private until you choose to share it.',
  },
  {
    icon: CheckCircle,
    title: 'Verified Profiles',
    description: 'All users go through ID verification to ensure a safe and professional environment.',
  },
  {
    icon: Video,
    title: 'Video Portfolios',
    description: 'Showcase your talent with emotion-tagged video submissions and professional reels.',
  },
  {
    icon: Star,
    title: 'Smart Matching',
    description: 'AI-powered recommendations connect the right talent with the right opportunities.',
  },
  {
    icon: Users,
    title: 'Secure Communication',
    description: 'In-app chat unlocks only after selection, keeping communication professional and safe.',
  },
  {
    icon: Sparkles,
    title: 'Premium Experience',
    description: 'Cinematic design, smooth interactions, and a delightful user experience throughout.',
  },
];
