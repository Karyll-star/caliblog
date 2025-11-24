import './blog/[slug]/blog.css'

import { Analytics } from '@vercel/analytics/react'
import { Suspense } from 'react'

import { Footer } from '~/app/(main)/Footer'
import { Header } from '~/app/(main)/Header'
import { QueryProvider } from '~/app/QueryProvider'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Organic Sci-Fi Background: Living Gradient */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none bg-zinc-50 dark:bg-zinc-950">
        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vivid Gradient Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob dark:bg-purple-900/30 dark:mix-blend-normal"></div>
        <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-300/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000 dark:bg-indigo-900/30 dark:mix-blend-normal"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-pink-300/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 dark:bg-pink-900/30 dark:mix-blend-normal"></div>
      </div>

      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          {/* Main Glass Container - Masked and very transparent */}
          <div 
            className="w-full bg-white/10 backdrop-blur-xl shadow-ceramic rounded-[2.5rem] my-4 dark:bg-zinc-900/40 dark:shadow-none dark:ring-1 dark:ring-white/5"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
            }}
          />
        </div>
      </div>

      <QueryProvider>
        <div className="relative text-zinc-600 dark:text-zinc-400 font-medium">
          <Header />
          <main>{children}</main>
          <Suspense>
            <Footer />
          </Suspense>
        </div>
      </QueryProvider>

      <Analytics />
    </>
  )
}
