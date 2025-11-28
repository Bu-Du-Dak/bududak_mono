import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src", "contents", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category?: string;
  description?: string;
  fileName: string;
};

export type PostData = Omit<PostMeta, "fileName"> & {
  contentHtml: string;
};

function readAllRawPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const slugFromFile = fileName.replace(/\.md$/, "");
      const slug = (data.slug as string) ?? slugFromFile;

      return {
        fileName,
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        category: data.category as string | undefined,
        description: data.description as string | undefined,
      };
    });
}

// 리스트 페이지
export function getAllPostsMeta(): PostMeta[] {
  return readAllRawPosts().sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function getAllPostCategories(): Array<string | undefined> {
  return readAllRawPosts().map((post) => post.category);
}
// 정적 경로 생성용 slug
export function getAllSlugs(): string[] {
  return readAllRawPosts().map((post) => post.slug);
}

// 디테일 페이지  사용
export async function getPostBySlug(slug: string): Promise<PostData> {
  const posts = readAllRawPosts();

  const meta = posts.find((post) => post.slug === slug);

  if (!meta) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const fullPath = path.join(postsDirectory, meta.fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug: meta.slug,
    title: meta.title,
    date: meta.date,
    category: meta.category,
    description: meta.description,
    contentHtml,
  };
}
