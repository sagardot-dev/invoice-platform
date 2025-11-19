"use client";
import { Container } from "@/components/global/container";
import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/const";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Nav = () => {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <div className=" w-full h-21  flex justify-center items-center  ">
      <Container className="  flex justify-between items-center px-7 py-6">
        <Link
          href={"/"}
          className=" flex justify-center items-center md:gap-x-3 gap-x-1"
        >
          <Image src="/logo.svg" alt="logo" width={16} height={16} />
          <p className=" md:text-md text-sm font-bold ">D-invoice</p>
        </Link>
        {!isMobile && (
          <div className=" flex flex-1 justify-center items-center gap-x-13">
            {navItems.map((items) => (
              <div key={items.id}>
                <Link href={items.path}>
                  <p
                    className={cn(
                      pathname === items.path && " font-bold text-chart-5"
                    )}
                  >
                    {items.label}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="  flex justify-center items-center md:gap-x-4 gap-x-2">
          {!session && (
            <>
              <Button
                onClick={() => {
                  router.push("/auth/sign-in");
                }}
                className=" bg-linear-0 from-primary via-chart-5 to-primary h-8! text-shadow-xs hover:shadow-brand border-0"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  router.push("/auth/sign-up");
                }}
                variant={"ghost"}
                className=" h-8!"
              >
                Sign Up
              </Button>
            </>
          )}
          {session && (
            <>
              <Button
                disabled={isPending}
                asChild
                className=" bg-linear-0 from-primary via-chart-5 to-primary h-8! text-shadow-xs shadow-brand border-0"
              >
                <Link prefetch href={"/dashboard"}>
                  Dashboard
                  <ArrowRight className=" size-4" />
                </Link>
              </Button>
              <Button
                variant={"outline"}
                disabled={isPending}
                onClick={() => authClient.signOut()}
                className=" h-8! text-shadow-xs border-0"
              >
                Logout
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </Container>
    </div>
  );
};

export default Nav;
