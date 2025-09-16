// Import the type from 'sanity' to avoid circular alias resolution in some setups
// https://www.sanity.io/docs/structure-builder-cheat-sheet
// Use a relaxed type to avoid cross-version type resolution issues during build
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
