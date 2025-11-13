"use client";
import { Container } from "@/components/global/container";
import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/const";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  return (
    <div className=" w-full h-21  flex justify-center items-center  ">
      <Container className="  flex justify-between items-center px-7   border-b py-6 border-border/20">
        <Link href={"/"} className=" flex justify-center items-center gap-x-3">
          <Image src="/logo.svg" alt="logo" width={16} height={16} />
          <p className=" text-md font-bold ">D-invoice</p>
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
        <div className="  flex justify-center items-center gap-x-4">
          <Button className=" bg-linear-0 from-primary via-chart-5 to-primary h-8! text-shadow-xs hover:shadow-brand border-0">
            Login
          </Button>
          <Button variant={"ghost"} className=" h-8!">
            Sign Up
          </Button>
          <ModeToggle />
        </div>
      </Container>
    </div>
  );
};

export default Nav;
