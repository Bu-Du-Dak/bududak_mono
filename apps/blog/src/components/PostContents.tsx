import { PostData } from "../lib/posts";

export default function PostContents({ post }: { post: PostData }) {
  return (
    <article>
      <h1 style={{ marginBottom: 8 }}>{post.title}</h1>
      <div style={{ fontSize: "0.9rem", color: "#888", marginBottom: 24 }}>
        {post.date}
        {post.category ? ` · ${post.category}` : null}
      </div>

      <div
        style={{ lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
