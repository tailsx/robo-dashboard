import { authClient } from "@/lib/auth-client";

function HomePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <div>Home Page {session?.user?.name}</div>;
}

export { HomePage };
