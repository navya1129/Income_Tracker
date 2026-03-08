import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Upload, Check, Shield, Camera, FileText, AlertCircle, Sparkles, CheckCircle
} from 'lucide-react';

type Step = 'upload' | 'processing' | 'verified';

export const VerificationFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setCurrentStep('processing');
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setCurrentStep('verified'), 500);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-zinc-950 light:bg-white pt-24 pb-12 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-center mb-4 text-white dark:text-white light:text-zinc-950">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Identity Verification
            </span>
          </h1>
          <p className="text-center text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-8">
            Verify your identity to access all platform features
          </p>

          <div className="flex items-center justify-between max-w-md mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
                    step.status === 'complete'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                      : step.status === 'active'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200'
                  }`}
                >
                  {step.status === 'complete' ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring' }}
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    <step.icon className="w-6 h-6 text-white" />
                  )}

                  {step.status === 'active' && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {i < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 rounded-full ${
                    step.status === 'complete'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                      : 'bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block p-6 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 mb-6"
                >
                  <Camera className="w-16 h-16 text-purple-400" />
                </motion.div>

                <h2 className="text-2xl font-bold mb-4 text-white dark:text-white light:text-zinc-950">
                  Upload Your ID
                </h2>
                <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-8">
                  We accept government-issued photo IDs such as driver's license, passport, or national ID card
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                className="relative p-12 rounded-2xl border-2 border-dashed border-zinc-700 dark:border-zinc-700 light:border-zinc-300 hover:border-purple-500 transition-colors cursor-pointer group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all"
                />

                <div className="relative text-center">
                  <Upload className="w-12 h-12 text-zinc-500 dark:text-zinc-500 light:text-zinc-400 mx-auto mb-4 group-hover:text-purple-400 transition-colors" />
                  <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-zinc-500">
                    PNG, JPG or PDF (max. 10MB)
                  </p>
                </div>
              </motion.div>

              <div className="mt-6 p-4 rounded-xl bg-blue-600/10 border border-blue-500/30">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-300 mb-1">
                      Your Privacy is Protected
                    </h4>
                    <p className="text-xs text-blue-400/80">
                      Your ID is encrypted and only used for verification. We never share your personal information.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block p-6 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 mb-6"
                >
                  <Sparkles className="w-16 h-16 text-purple-400" />
                </motion.div>

                <h2 className="text-2xl font-bold mb-4 text-white dark:text-white light:text-zinc-950">
                  Verifying Your Identity
                </h2>
                <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-8">
                  Please wait while we securely verify your document
                </p>

                {/* Animated Progress Bar */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-400">Progress</span>
                    <span className="text-sm font-bold text-white dark:text-white light:text-zinc-950">
                      {progress}%
                    </span>
                  </div>
                  <div className="h-3 bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Processing Steps */}
                <div className="space-y-3 max-w-md mx-auto">
                  {processingSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: progress > i * 33 ? 1 : 0.3,
                        x: 0,
                      }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        progress > i * 33
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : 'bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200'
                      }`}>
                        {progress > (i + 1) * 33 && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        progress > i * 33
                          ? 'text-white dark:text-white light:text-zinc-950'
                          : 'text-zinc-500'
                      }`}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'verified' && (
            <motion.div
              key="verified"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 rounded-3xl bg-white/5 dark:bg-white/5 light:bg-zinc-900/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-zinc-900/10 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="inline-block p-6 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 mb-6 relative"
              >
                <CheckCircle className="w-16 h-16 text-white" />
                
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-4 text-white dark:text-white light:text-zinc-950"
              >
                You're Verified!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-8"
              >
                Your account has been successfully verified. You now have access to all platform features.
              </motion.p>

              {/* Verified Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center"
                >
                  <Check className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-left">
                  <div className="font-bold text-white dark:text-white light:text-zinc-950">
                    Verified Member
                  </div>
                  <div className="text-sm text-green-300">
                    Badge added to your profile
                  </div>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
              >
                Continue to Dashboard
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const steps = [
  { icon: FileText, status: 'complete' as const },
  { icon: Camera, status: 'active' as const },
  { icon: CheckCircle, status: 'pending' as const },
];

const processingSteps = [
  'Analyzing document',
  'Verifying authenticity',
  'Completing verification',
];
