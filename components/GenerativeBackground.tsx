'use client'

import React, { useEffect, useRef } from 'react'

export function GenerativeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width: number, height: number
    let particles: Particle[] = []
    const particleCount = 600
    let noiseZ = 0
    let animationFrameId: number

    // 简单的伪随机噪声函数
    function noise(x: number, y: number, z: number) {
      const p = 50
      return (
        Math.sin(x / p + z) * Math.cos(y / p + z) +
        Math.sin(x / p + y / p + z)
      )
    }

    class Particle {
      x: number = 0
      y: number = 0
      vx: number = 0
      vy: number = 0
      life: number = 0
      color: string = ''

      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = 0
        this.vy = 0
        this.life = Math.random() * 100 + 50
        const colors = [
          'rgba(52, 152, 219, 0.05)',
          'rgba(155, 89, 182, 0.05)',
          'rgba(241, 196, 15, 0.05)',
          'rgba(255,255,255, 0.02)',
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        const angle = noise(this.x, this.y, noiseZ) * Math.PI * 2
        this.vx += Math.cos(angle) * 0.5
        this.vy += Math.sin(angle) * 0.5
        this.vx *= 0.9
        this.vy *= 0.9
        this.x += this.vx
        this.y += this.vy
        this.life--

        if (
          this.life <= 0 ||
          this.x < 0 ||
          this.x > width ||
          this.y < 0 ||
          this.y > height
        ) {
          this.reset()
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.x - this.vx * 3, this.y - this.vy * 3)
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = this.color
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    function initParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function resize() {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initParticles()
      if (ctx) {
        ctx.fillStyle = '#050505'
        ctx.fillRect(0, 0, width, height)
      }
    }

    function animate() {
      if (!ctx) return
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      noiseZ += 0.00001
      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
    />
  )
}
