// src/services/stringService.ts

// This will hold the strings once they are fetched from the server.
let strings: Record<string, string> = {};

/**
 * Initializes the string service with strings from the server.
 * This should be called once in the App's context after settings are fetched.
 * @param newStrings - A map of key-value pairs.
 */
export const initStrings = (newStrings: Record<string, string>) => {
  if (newStrings) {
    strings = newStrings;
  }
};

/**
 * A simple translation function.
 * It looks up a key in the initialized strings map.
 * If the key is not found, it returns the key itself as a fallback.
 * @param key - The key of the string to translate.
 * @returns The translated string or the key if not found.
 */
export const t = (key: string): string => {
  return strings[key] || key;
};
