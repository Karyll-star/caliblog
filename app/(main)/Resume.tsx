import Image from 'next/image'
import React from 'react'

import { BriefcaseIcon } from '~/assets'

type Resume = {
  company: string
  title: string
  start: string
  end?: string | null
  logo: string
}

export function Resume({ resume }: { resume: Resume[] }) {
  return (
    <div className="rounded-[2rem] bg-[var(--bg-card)] p-6 shadow-ceramic backdrop-blur-sm dark:shadow-none dark:ring-1 dark:ring-white/10">
      <h2 className="flex items-center text-sm font-semibold text-[var(--text-primary)]">
        <BriefcaseIcon className="h-5 w-5 flex-none" />
        <span className="ml-2">工作经历</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--bg-icon)] shadow-ceramic dark:shadow-none dark:ring-1 dark:ring-zinc-700/50">
              <Image
                src={role.logo}
                alt={role.company}
                className="h-8 w-8 rounded-full"
                width={100}
                height={100}
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">公司</dt>
              <dd className="w-full flex-none text-sm font-medium text-[var(--text-primary)]">
                {role.company}
              </dd>
              <dt className="sr-only">职位</dt>
              <dd className="text-xs text-[var(--text-secondary)]">
                {role.title}
              </dd>
              <dt className="sr-only">日期</dt>
              <dd className="ml-auto text-xs text-[var(--text-secondary)] opacity-80">
                {role.start}
                <span aria-hidden="true">—</span> {role.end ?? '至今'}
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}
