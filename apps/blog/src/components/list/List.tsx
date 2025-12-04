import { getAllPostCategories, getAllPostsMeta } from "../../lib/posts";

import ListItems from "./ListItems";
import CategoryList from "./CategoryList";
import ResponsiveListWrapper from "./ResponsiveListWrapper";

export default async function List({ category }: { category?: string }) {
  const posts = getAllPostsMeta();
  const categories = getAllPostCategories();

  const filteredPosts = category
    ? posts.filter((post) => post.category === category)
    : posts;

  return (
    <ResponsiveListWrapper>
      <ListItems posts={filteredPosts} />
      <CategoryList categories={categories} selected={category} />
    </ResponsiveListWrapper>
  );
}
