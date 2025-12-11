/* eslint-disable simple-import-sort/imports */
'use client'

import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { AtomIcon, SparkleIcon, UserSecurityIcon } from '~/assets'
import { SocialLink } from '~/components/links/SocialLink'

function Developer() {
  return (
    <span className="group">
      <span className="font-mono">&lt;</span>开发者
      <span className="font-mono">/&gt;</span>
      <span className="invisible inline-flex text-[var(--text-muted)] before:content-['|'] group-hover:visible group-hover:animate-typing" />
    </span>
  )
}

function Designer() {
  return (
    <span className="group relative bg-[var(--bg-highlight)] p-1">
      <span className="pointer-events-none absolute inset-0 border border-[var(--border-accent)] opacity-70 group-hover:border-dashed group-hover:opacity-100">
        <span className="absolute -left-[3.5px] -top-[3.5px] size-1.5 border border-[var(--border-accent-solid)] bg-[var(--bg-color)]" />
        <span className="absolute -bottom-[3.5px] -right-[3.5px] size-1.5 border border-[var(--border-accent-solid)] bg-[var(--bg-color)]" />
        <span className="absolute -bottom-[3.5px] -left-[3.5px] size-1.5 border border-[var(--border-accent-solid)] bg-[var(--bg-color)]" />
        <span className="absolute -right-[3.5px] -top-[3.5px] size-1.5 border border-[var(--border-accent-solid)] bg-[var(--bg-color)]" />
      </span>
      设计师
    </span>
  )
}

function OCD() {
  return (
    <span className="group inline-flex items-center">
      <SparkleIcon className="mr-1 inline-flex transform-gpu transition-transform duration-500 group-hover:rotate-180" />
      <span>细节控</span>
    </span>
  )
}

function Founder() {
  return (
    <span className="group inline-flex items-center">
      <UserSecurityIcon className="mr-1 inline-flex group-hover:fill-[var(--fill-hover)]" />
      <span>学习者</span>
    </span>
  )
}

export function Headline() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="max-w-2xl">
      <h1
        className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
      >
        <Developer />，<Designer />，
        <span className="block h-2" />
        <OCD />，<Founder />
      </h1>
      <p
        className="mt-6 text-base text-[var(--text-secondary)]"
      >
        我是 karyll-周兴，
        华东理工大学工业设计专业的一名大三的学生。
        我热爱开发，设计，创新，享受生活，以及在未知领域中探索。
      </p>
      <div
        className="mt-6 flex gap-6"
      >
        <SocialLink
          href="https://x.com/KaryllXXD"
          aria-label="我的推特"
          platform="twitter"
        />
        <SocialLink
          href="https://www.youtube.com/@karyllDX"
          aria-label="我的 YouTube"
          platform="youtube"
        />
        <SocialLink
          href="https://space.bilibili.com/272443475"
          aria-label="我的 Bilibili"
          platform="bilibili"
        />
        <SocialLink
          href="https://github.com/Karyll-star"
          aria-label="我的 GitHub"
          platform="github"
        />
        {/* 打开本地 mydy.jpg 的优雅弹窗 */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="查看图片"
              className="group -m-1 p-1"
            >
              <AtomIcon className="h-5 w-5 text-zinc-400 transition group-hover:text-[var(--text-hover)]" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ type: 'spring', damping: 26, stiffness: 220, duration: 0.2 }}
              >
                <div className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
                  <Dialog.Close asChild>
                    <button
                      aria-label="关闭"
                      className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-1 text-white backdrop-blur transition hover:bg-black/60 dark:bg-white/30 dark:text-black dark:hover:bg-white/40"
                    >
                      ✕
                    </button>
                  </Dialog.Close>
                  <Image
                    src={require('~/app/mydy.jpg')}
                    alt="mydy"
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <SocialLink
          href="karyllddx@gmail.com"
          aria-label="我的邮箱"
          platform="mail"
        />
      </div>
    </div>
  )
}