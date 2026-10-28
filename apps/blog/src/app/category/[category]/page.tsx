import List from "../../../components/list/List";

export default async function ListByCategory({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;
  return <List category={category} />;
}
