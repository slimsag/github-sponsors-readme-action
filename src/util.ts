/* Utility function that checks to see if a value is undefined or not. */
export const isNullOrUndefined = (value: string | undefined | null): boolean =>
  typeof value === 'undefined' || value === null || value === ''