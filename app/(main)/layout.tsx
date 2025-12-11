import './blog/[slug]/blog.css'

import { Analytics } from '@vercel/analytics/react'
import { Suspense } from 'react'

import { Footer } from '~/app/(main)/Footer'
import { Header } from '~/app/(main)/Header'
import { QueryProvider } from '~/app/QueryProvider'
import { GenerativeBackground } from '~/components/GenerativeBackground'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
        {/* Light Mode Background */}
        <div className="absolute inset-0 bg-zinc-50 dark:hidden">
          <div 
            className="absolute inset-0 opacity-[0.1] mix-blend-overlay z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-300/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-pink-300/60 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>

        {/* Dark Mode Background */}
        <div className="hidden dark:block absolute inset-0 bg-[#050505]">
          <GenerativeBackground />
        </div>
      </div>

      <QueryProvider>
        <div className="relative flex justify-center w-full my-4">
          
          {/* Card Background Layer - Width constrained, height follows content */}
          <div className="absolute top-0 bottom-0 flex w-full max-w-7xl lg:px-8 justify-center pointer-events-none -z-10">
            <div className="w-full h-full bg-white/60 backdrop-blur-2xl shadow-ceramic rounded-[2.5rem] dark:bg-zinc-900/40 dark:shadow-none dark:ring-1 dark:ring-white/5" />
          </div>

          {/* Content Layer - Full width to allow Photos to bleed out */}
          <div className="relative w-full text-[var(--text-secondary)] font-medium min-h-[calc(100vh-2rem)]">
            <Header />
            <main>{children}</main>
            <Suspense>
              <Footer />
            </Suspense>
          </div>

        </div>
      </QueryProvider>

      <Analytics />
    </>
  )
}
