import fs from "fs";
import path from "path";
import matter from "gray-matter";

const LETTERS_DIR = path.join(process.cwd(), "content/letters");

export interface LetterMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
}

export interface Letter extends LetterMeta {
  content: string;
}

export function getAllLetters(): LetterMeta[] {
  if (!fs.existsSync(LETTERS_DIR)) return [];
  const files = fs.readdirSync(LETTERS_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(LETTERS_DIR, filename), "utf8");
      const { data } = matter(raw);
      // gray-matter parses bare YAML dates (2026-03-20) as JS Date objects.
      // Normalize to YYYY-MM-DD string so all downstream code gets a string.
      const rawDate = data.date;
      const date = rawDate instanceof Date
        ? rawDate.toISOString().split("T")[0]
        : (rawDate ?? "");
      return {
        slug,
        title: data.title ?? "Untitled",
        date,
        excerpt: data.excerpt ?? "",
        image: data.image,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLetter(slug: string): Letter | null {
  const filepath = path.join(LETTERS_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const rawDate = data.date;
  const date = rawDate instanceof Date
    ? rawDate.toISOString().split("T")[0]
    : (rawDate ?? "");
  return {
    slug,
    title: data.title ?? "Untitled",
    date,
    excerpt: data.excerpt ?? "",
    image: data.image,
    content,
  };
}
