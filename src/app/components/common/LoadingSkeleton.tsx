import { motion } from 'motion/react';

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
        >
          {/* Header Skeleton */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-6 w-3/4 rounded-lg mb-3"
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                  backgroundSize: '200% 100%',
                }}
              />
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                className="h-4 w-1/2 rounded-lg"
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                  backgroundSize: '200% 100%',
                }}
              />
            </div>
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              className="h-10 w-10 rounded-xl"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                backgroundSize: '200% 100%',
              }}
            />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-2 mb-4">
            {[...Array(3)].map((_, j) => (
              <motion.div
                key={j}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: j * 0.1 }}
                className="h-4 rounded-lg"
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                  backgroundSize: '200% 100%',
                  width: j === 2 ? '60%' : '100%',
                }}
              />
            ))}
          </div>

          {/* Tags Skeleton */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, k) => (
              <motion.div
                key={k}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: k * 0.1 }}
                className="h-6 w-16 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                  backgroundSize: '200% 100%',
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
        >
          {/* Image Skeleton */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="aspect-video rounded-2xl mb-4"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
              backgroundSize: '200% 100%',
            }}
          />

          {/* Title Skeleton */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
            className="h-5 w-3/4 rounded-lg mb-3"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
              backgroundSize: '200% 100%',
            }}
          />

          {/* Description Skeleton */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="h-4 w-full rounded-lg mb-2"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
              backgroundSize: '200% 100%',
            }}
          />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            className="h-4 w-2/3 rounded-lg"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
