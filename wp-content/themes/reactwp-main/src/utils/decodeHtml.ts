/**
 * Decodes HTML entities from a string.
 * This is useful for WordPress titles and excerpts that come HTML-encoded from the API.
 */
export const decodeHtml = (html: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
