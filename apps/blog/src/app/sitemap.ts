import { getAllPostsMeta } from "../lib/posts";

const SITE_URL = "https://blog.bududak.com";

export default async function sitemap() {
  const posts = getAllPostsMeta();

  const postUrls = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: post.date,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
    },
    ...postUrls,
  ];
}
