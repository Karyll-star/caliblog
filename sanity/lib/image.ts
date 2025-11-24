import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// Backward-compatible alias for existing imports
export const urlForImage = urlFor

// Opinionated helper: apply sensible defaults for perf
export const buildImage = (source: SanityImageSource) =>
  urlFor(source).auto('format').fit('max')

// Next/Image loader for Sanity CDN: dynamically applies width/quality per actual render size
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sanityImageLoader = ({ src, width, quality }: any) => {
  const url = typeof src === 'string' ? src : ''
  const hasQuery = url.includes('?')
  const q = quality ?? 90
  const params = [`auto=format`, `w=${width}`, `q=${q}`]
  return `${url}${hasQuery ? '&' : '?'}${params.join('&')}`
}
