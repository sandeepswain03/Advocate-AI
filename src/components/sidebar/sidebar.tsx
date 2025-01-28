import React, { useEffect, useState } from "react";
import { ChevronLeft, Menu, X } from "lucide-react";
import { Layout } from "./custom/layout";
import { Button } from "./custom/button";
import Nav from "./nav";
import { cn } from "@/lib/cn";
import Link from "next/link";
import Icons from "../global/icons";
import { getNavigationLinks } from "@/constants/sidelinks";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);

  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  const navigationLinks = getNavigationLinks();

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? "md:w-14" : "md:w-64"
        }`,
        className
      )}
    >
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? "h-svh opacity-50" : "h-0 opacity-0"
        } w-full md:hidden`}
      />

      <Layout fixed className={navOpened ? "h-svh" : ""}>
        <Layout.Header
          sticky
          className="z-50 flex items-center justify-between px-4 py-3 shadow-sm md:px-4 h-16"
        >
          <div className="flex items-center gap-2">
            <Link prefetch={false} href="/dashboard">
              {isCollapsed ? (
                <Icons.icon className="w-6" />
              ) : (
                <div className="flex items-center gap-4">
                  <Icons.icon className="w-6" />
                  <span className="text-xl font-semibold">Advocate AI</span>
                </div>
              )}
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <X /> : <Menu />}
          </Button>
        </Layout.Header>

        <Nav
          id="sidebar-menu"
          className={cn(
            "z-40 h-full flex-1 overflow-auto",
            navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"
          )}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={navigationLinks}
        />
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-5 bottom-4 z-50 hidden rounded-full md:inline-flex hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </Layout>
    </aside>
  );
}

export default Sidebar;
