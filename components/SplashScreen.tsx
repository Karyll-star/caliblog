'use client'

import { clsxm } from '@zolplay/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'

interface SplashScreenProps {
  animationData: unknown
  duration?: number
  className?: string
}

export function SplashScreen({ 
  animationData, 
  duration = 2000,
  className 
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Prevent scrolling while loading
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [duration, isVisible])

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={clsxm(
            "fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-zinc-950",
            className
          )}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 md:w-64 md:h-64"
          >
            {animationData && <Lottie animationData={animationData} loop={true} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
