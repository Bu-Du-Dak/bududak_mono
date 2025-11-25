import Link from "next/link";
import { getAllPostsMeta } from "../lib/posts";

export default async function List() {
  const posts = getAllPostsMeta();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          {post.date}
          {post.description}
        </li>
      ))}
    </ul>
  );
}
