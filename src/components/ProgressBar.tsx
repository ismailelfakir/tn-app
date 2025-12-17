/**
 * ProgressBar Component
 * Shows question progress with animated gradient bar
 */

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = ((current + 1) / total) * 100;
  const questionsAnswered = current;
  const questionsRemaining = total - current - 1;

  return (
    <div className="w-full mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-900">
            Question {current + 1} sur {total}
          </span>
          {questionsAnswered > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center space-x-1 text-green-600"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-medium">{questionsAnswered} répondue{questionsAnswered > 1 ? 's' : ''}</span>
            </motion.div>
          )}
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-purple-600">
            {Math.round(percentage)}%
          </span>
          {questionsRemaining > 0 && (
            <p className="text-xs text-gray-500">
              {questionsRemaining} restante{questionsRemaining > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />
          
          {/* Pulse effect at the end */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-1 bg-white"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-between mt-2 px-1">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`w-2 h-2 rounded-full ${
              index <= current
                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
