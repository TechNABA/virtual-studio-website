import fs from 'node:fs';
import path from 'node:path';

/**
 * Given a slug like "multi-user", looks for an image in public/images/
 * matching "multi-user.jpg", "multi-user.png", "multi-user.gif", "multi-user.webp"
 * (in that order of preference) and returns the public URL path.
 *
 * The lookup is case-insensitive, so "Multi-User.jpg" will also be found
 * for slug "multi-user" (important for cross-platform consistency between
 * macOS/Windows, where file systems are case-insensitive, and Linux/GitHub
 * Actions, which is case-sensitive).
 *
 * Returns null if no matching file is found.
 *
 * This runs at build time (on the Node.js file system), so there's no
 * runtime overhead and no flash of missing images in the browser.
 */
const PUBLIC_IMAGES_DIR = path.resolve('./public/images');
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Cache the directory listing so we don't re-scan on every card
let cachedFiles: string[] | null = null;
function listImageFiles(): string[] {
  if (cachedFiles !== null) return cachedFiles;
  try {
    cachedFiles = fs.readdirSync(PUBLIC_IMAGES_DIR);
  } catch {
    cachedFiles = [];
  }
  return cachedFiles;
}

export function resolveCoverImage(slug: string | undefined, base: string = '/'): string | null {
  if (!slug) return null;

  // If the user already passed a full URL or a path starting with /, trust it.
  if (slug.startsWith('http') || slug.startsWith('/')) {
    return slug;
  }

  const files = listImageFiles();
  const slugLower = slug.toLowerCase();

  for (const ext of EXTENSIONS) {
    // Find a file whose name (case-insensitive) matches slug + ext
    const match = files.find((f) => f.toLowerCase() === slugLower + ext);
    if (match) {
      const url = `${base}/images/${match}`.replace(/\/+/g, '/');
      return url;
    }
  }

  return null;
}

