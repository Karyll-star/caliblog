export const seo = {
  title: 'Karyll | 开发者、设计师、细节控、学习者',
  description:
    '我是 karyll-周兴， 华东理工大学工业设计专业的一名大三的学生。 我热爱开发，设计，创新，享受生活，以及在未知领域中探索。',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://blog.karyll.art/'
      : 'http://localhost:3000'
  ),
} as const
