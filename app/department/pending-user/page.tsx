type SearchParams = {
  user?: string;
};

type PendingUserPageProps = {
  searchParams: SearchParams;
};

export default async function PendingUserPage({
  searchParams,
}: PendingUserPageProps) {
  return <div>Hello {searchParams.user ?? "user"}</div>;
}
