import { getServerSessionOrRedirect } from "@/components/global/check-session-server";
import InvoiceLandingPage from "@/modules/home/components/home-components";

export default async function Home() {
  const session = await getServerSessionOrRedirect();
  return (
    <div className=" h-screen w-full ">
      <InvoiceLandingPage />
    </div>
  );
}
