'use client'

import { motion } from 'framer-motion'
import Lottie, { type LottieRefCurrentProps } from 'lottie-react'
import { useTheme } from 'next-themes'
import React from 'react'

import dayNightAnimation from '~/assets/day_night_cycle.json'

const themes = [
  {
    label: '浅色模式',
    value: 'light',
  },
  {
    label: '深色模式',
    value: 'dark',
  },
]

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false)
  const [lottieLoaded, setLottieLoaded] = React.useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const lottieRef = React.useRef<LottieRefCurrentProps>(null)
  const prevThemeRef = React.useRef<string | undefined>(undefined)
  const totalFramesRef = React.useRef(481)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const lottie = lottieRef.current
    if (!lottie || !mounted || !lottieLoaded || resolvedTheme === undefined) return

    if (prevThemeRef.current === resolvedTheme) {
      return
    }

    const totalFrames = lottie.getDuration(true) || 481
    const midFrame = Math.round(totalFrames * 0.5)

    lottie.stop()
    lottie.setSpeed(2)
    lottie.setDirection(1)

    if (prevThemeRef.current === undefined) {
      // 首次加载：直接跳转，不播放
      if (resolvedTheme === 'dark') {
        lottie.goToAndStop(midFrame, true)
      } else {
        lottie.goToAndStop(0, true)
      }
    } else {
      // 后续切换：播放动画
      if (resolvedTheme === 'dark') {
        // Light -> Dark
        lottie.playSegments([0, midFrame], true)
      } else {
        // Dark -> Light
        lottie.playSegments([midFrame, totalFramesRef.current], true)
      }
    }

    prevThemeRef.current = resolvedTheme
  }, [resolvedTheme, mounted, lottieLoaded])

  const onDOMLoaded = () => {
    const lottie = lottieRef.current
    if (!lottie) return

    totalFramesRef.current = lottie.getDuration(true) || 481
    setLottieLoaded(true)
  }

  function toggleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return <div className="h-10 w-10" />
  }

  return (
    <motion.div
      className="group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20 h-10 w-10 flex items-center justify-center cursor-pointer"
      onClick={toggleTheme}
      aria-label="切换颜色主题"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 200,
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={dayNightAnimation}
        loop={false}
        autoplay={false}
        onDOMLoaded={onDOMLoaded}
        className="h-full w-full pointer-events-none"
      />
    </motion.div>
  )
}
