import ShortUniqueId from 'short-unique-id';
import { prisma } from '@repo/db';

export async function slugify(text: string): Promise<string> {
  const uid = new ShortUniqueId({ length: 5 });

  const slug = text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  const checkUniqueSlug = await prisma.templates.findUnique({
    where: { slugUrl: slug },
  });

  if (checkUniqueSlug) return uid.rnd();

  if (slug.length <= 3 || slug.length > 20) return uid.rnd();

  return slug;
}
