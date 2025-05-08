// src/utils/mdx.server.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified, type Plugin } from "unified";
import remarkParse from "remark-parse";
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings, {
  Options as AutolinkOptions,
} from "remark-autolink-headings";
import { visit } from "unist-util-visit";
import Slugger from "github-slugger";
import { serialize } from "next-mdx-remote/serialize";
import type { Root, Heading, Text } from "mdast";

const docsDir = path.join(process.cwd(), "src", "content", "docs");
const slugPlugin = remarkSlug as unknown as Plugin;
const autolinkPlugin = remarkAutolinkHeadings as unknown as Plugin<
  [AutolinkOptions?],
  Root,
  Root
>;

export type DocMeta = {
  slug: string;
  title: string;
  order: number | null;
  icon: string | null;
};

export function getAllDocsMeta(): DocMeta[] {
  const files: string[] = [];
  function walk(dir: string) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (name.endsWith(".mdx")) {
        const rel = path.relative(docsDir, full).split(path.sep).join("/");
        files.push(rel);
      }
    }
  }
  walk(docsDir);

  const docs = files.map((file) => {
    const raw = fs.readFileSync(path.join(docsDir, file), "utf-8");
    const { data } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    const title = typeof data.title === "string" ? data.title : slug;
    const order = typeof data.order === "number" ? data.order : null;
    const icon = typeof data.icon === "string" ? data.icon : null;
    return { slug, title, order, icon };
  });

  return docs.sort((a, b) => {
    const diff = (a.order ?? 0) - (b.order ?? 0);
    if (diff !== 0) return diff;
    return a.title.localeCompare(b.title);
  });
}

export function getDocBySlug(slug: string): {
  content: string;
  data: { title: string; order: number | null; icon: string | null };
} {
  const fullPath = path.join(docsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { content, data } = matter(raw);
  const title = typeof data.title === "string" ? data.title : slug;
  const order = typeof data.order === "number" ? data.order : null;
  const icon = typeof data.icon === "string" ? data.icon : null;
  return { content, data: { title, order, icon } };
}

export function getHeadings(raw: string) {
  const headings: { text: string; slug: string; level: number }[] = [];
  const slugger = new Slugger();
  const tree = unified().use(remarkParse).parse(raw) as Root;
  visit(tree, "heading", (node: Heading) => {
    const level = node.depth;
    if (level < 2 || level > 4) return;
    const text = node.children
      .filter((c): c is Text => c.type === "text")
      .map((c) => c.value)
      .join("");
    const slug = slugger.slug(text);
    headings.push({ text, slug, level });
  });
  return headings;
}

export async function serializeMDX(raw: string) {
  return serialize(raw, {
    mdxOptions: { remarkPlugins: [slugPlugin, autolinkPlugin] },
  });
}
