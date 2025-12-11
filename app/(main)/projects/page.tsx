import { type Metadata } from 'next'

import { Projects } from '~/app/(main)/projects/Projects'
import { Container } from '~/components/ui/Container'

const title = '我的项目'
const description =
  '大学以来，我一直在做各种各样的小项目，这里就是我筛选出来我觉得还不错的项目合集，也是我在技术领域中尝试和探索的最好见证。'
export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
  },
} satisfies Metadata

export default function ProjectsPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          我过去的项目冒险之旅。
        </h1>
        <p className="mt-6 text-base text-[var(--text-secondary)]">
          大学以来，我一直在做各种各样的小项目，有<b>炫酷</b>的，有<b>艺术性</b>
          的，也有 <b>just for fun </b>
          的，下面就是我筛选出来我觉得还不错的项目合集，也是我在技术领域中尝试和探索的最好见证。
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        <Projects />
      </div>
    </Container>
  )
}

export const revalidate = 3600
