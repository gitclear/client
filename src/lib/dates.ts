// Astro resolves this once per build; pass it into hydrated components so their
// initial render agrees with the generated HTML, including across New Year.
export const currentYear = new Date().getFullYear();
