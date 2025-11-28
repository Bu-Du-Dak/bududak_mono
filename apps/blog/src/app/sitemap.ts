import { getAllPostsMeta } from "../lib/posts";

const SITE_URL = "https://blog.bududak.com";

export default async function sitemap() {
  const posts = getAllPostsMeta();

  const postUrls = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: post.date,
  }));
  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean))
  ) as string[];

  const categoryUrls = categories.map((category) => ({
    url: `${SITE_URL}/category/${category}`,

    lastModified:
      posts
        .filter((p) => p.category === category)
        .map((p) => p.date)
        .sort()
        .at(-1) ?? new Date().toISOString(),
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
    },
    ...categoryUrls,
    ...postUrls,
  ];
}
