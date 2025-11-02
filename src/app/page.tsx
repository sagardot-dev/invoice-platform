import { getServerSessionOrRedirect } from "@/components/global/check-session-server";

export default async function Home() {
  const session = await getServerSessionOrRedirect();
  return <div className=" h-screen w-full bg-background">hi</div>;
}
