import List from "../../../components/list/List";

export default function ListByCategory({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  return <List category={category} />;
}
