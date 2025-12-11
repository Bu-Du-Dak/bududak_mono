import DefaultLayout from "@repo/ui/layout/DefaultLayout";

import { ReactNode } from "react";
import { getPostBySlug } from "../../../lib/posts";
import PostHeader from "../../../components/post/PostHeader";
import { ParamsPromise } from "./page";

export default async function DetailLayout({
  params,
  children,
}: {
  params: ParamsPromise;
  children: ReactNode;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  return (
    <DefaultLayout
      headerContent={<PostHeader post={post} />}
      maxWidth={{
        web: 90,
        tablet: 90,
        mobile: "100%",
      }}
    >
      {children}
    </DefaultLayout>
  );
}
