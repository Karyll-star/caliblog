export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-16'

// Provide a safe default for local/dev: if not set or set to legacy value "blog",
// fall back to the conventional "production" dataset to avoid runtime errors.
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const dataset = rawDataset && rawDataset !== 'blog' ? rawDataset : 'production'

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
