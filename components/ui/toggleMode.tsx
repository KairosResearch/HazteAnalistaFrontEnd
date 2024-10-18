"use client";

import * as React from "react";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer flex gap-3 dark:hover:bg-[#3B8A48]/10 hover:bg-[#1f1f1f]/10 "
              onClick={() => setTheme("light")}
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] mr-2" />
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer flex gap-3 dark:hover:bg-[#3B8A48]/10 hover:bg-[#1f1f1f]/10 "
              onClick={() => setTheme("dark")}
            >
              <MoonIcon className="h-[1.2rem] w-[1.2rem] mr-2" />
              Oscuro
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer flex gap-3 dark:hover:bg-[#3B8A48]/10 hover:bg-[#1f1f1f]/10 "
              onClick={() => setTheme("system")}
            >
              <MonitorIcon className="h-[1.2rem] w-[1.2rem] mr-2" />
              Sistema
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
}
