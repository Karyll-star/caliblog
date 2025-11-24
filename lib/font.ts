import { Outfit } from 'next/font/google'

const sansFont = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export { sansFont }
