import Link from "next/link";
import { getAllPostCategories, getAllPostsMeta } from "../lib/posts";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import Chip from "@repo/ui/components/Chip";

export default async function List({ category }: { category?: string }) {
  const posts = getAllPostsMeta();
  const categories = getAllPostCategories();

  const filteredPosts = category
    ? posts.filter((post) => post.category === category)
    : posts;

  return (
    <div>
      <div style={{ display: "flex", gap: "0.6rem" }}>
        {categories.map((e) => (
          <Chip key={e}>
            <Link href={`/category/${e}`}>{e}</Link>
          </Chip>
        ))}
      </div>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.slug}>
            <Heading level={3}>
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </Heading>
            {post.date}
            <Paragraph>{post.description}</Paragraph>
          </li>
        ))}
      </ul>
    </div>
  );
}
