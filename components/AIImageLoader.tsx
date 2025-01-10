import React from 'react'
import { motion } from 'framer-motion'

interface AIImageLoaderProps {
  progress: number
}

const AIImageLoader: React.FC<AIImageLoaderProps> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-background/80 backdrop-blur-sm">
      <div className="relative w-32 h-32">
        <motion.div
          className="absolute inset-0 border-4 border-primary rounded-full"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            rotate: -90,
            strokeDasharray: '1 1',
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-primary font-bold text-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>
      <motion.div
        className="mt-4 text-primary font-semibold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        AI is crafting your masterpiece...
      </motion.div>
      <div className="mt-4 flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-primary rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AIImageLoader

