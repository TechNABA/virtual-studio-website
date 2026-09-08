import type { CollectionEntry } from 'astro:content';

export interface ProjectGroup {
  category: string;
  items: CollectionEntry<'projects'>[];
}

/**
 * Groups the projects of one tab by their `category` field, ready to render.
 *
 * Categories listed in `categoryOrder` come first, in that order; any category
 * not listed there follows, in the order the projects were collected. Within a
 * group, projects are sorted by their `order` field (lower first).
 *
 * Each tab page passes its own `categoryOrder`, so what appears on the page is
 * decided in the page, while the grouping itself lives here in one place.
 */
export function groupByCategory(
  projects: CollectionEntry<'projects'>[],
  categoryOrder: string[],
): ProjectGroup[] {
  const byCategory = new Map<string, CollectionEntry<'projects'>[]>();
  for (const p of projects) {
    const cat = p.data.category;
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(p);
  }

  const orderedCategories = [
    ...categoryOrder.filter((c) => byCategory.has(c)),
    ...[...byCategory.keys()].filter((c) => !categoryOrder.includes(c)),
  ];

  return orderedCategories.map((category) => ({
    category,
    items: byCategory.get(category)!.sort((a, b) => a.data.order - b.data.order),
  }));
}
