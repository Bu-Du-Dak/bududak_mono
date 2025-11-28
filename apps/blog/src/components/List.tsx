import Link from "next/link";
import { getAllPostsMeta } from "../lib/posts";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";

export default async function List({ category }: { category?: string }) {
  const posts = getAllPostsMeta();

  const filteredPosts = category
    ? posts.filter((post) => post.category === category)
    : posts;

  return (
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
  );
}
