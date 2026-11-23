import { getCollection, type CollectionEntry } from 'astro:content';

export type Actualite = CollectionEntry<'actualites'>;

/** Every article, newest first (same order as the Webflow lists). */
export async function getActualites(): Promise<Actualite[]> {
  const time = (e: Actualite) => e.data.date?.getTime() ?? 0;
  return (await getCollection('actualites')).sort(
    (a, b) => time(b) - time(a) || (b.data.sameDayOrder ?? 0) - (a.data.sameDayOrder ?? 0),
  );
}

/** "Découvrez également": the 3 newest other articles of the same category. */
export const relatedTo = (entry: Actualite, all: Actualite[], count = 3) =>
  all.filter(e => e.id !== entry.id && e.data.category === entry.data.category).slice(0, count);
