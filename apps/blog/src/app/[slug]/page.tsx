import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "../../lib/posts";
import ArticleLD from "../../components/ArticleLD";
import PostContents from "../../components/PostContents";
import PostNav from "../../components/PostNav";
const SITE_URL = "https://blog.bududak.com";
type ParamsPromise = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: ParamsPromise;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const url = new URL(`/posts/${post.slug}`, SITE_URL).toString();
  const title = post.title;
  const description = post.description ?? `${post.title} | Bududak Blog`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function PostPage({ params }: { params: ParamsPromise }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  const url = new URL(`/posts/${post.slug}`, SITE_URL).toString();

  const description = post.description ?? `${post.title} - Bududak Blog`;

  return (
    <main>
      <ArticleLD
        title={post.title}
        description={description}
        url={url}
        datePublished={post.date}
        category={post.category}
      />
      <p style={{ marginBottom: 16 }}>
        <Link href="/">← 리스트로 돌아가기</Link>
      </p>
      <div style={{ display: "flex" }}>
        <PostContents post={post} />
        <PostNav />
      </div>
    </main>
  );
}
