"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { isServer } from "@/utils/helpers";
import { useState, useEffect } from "react";

const NotFoundPage = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  const logoSrc = isServer()
    ? "/images/logoBlack.png"
    : resolvedTheme === "light"
    ? "/images/logoBlack.png"
    : "/images/logoWhite.png";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src={logoSrc}
        alt={`${APP_NAME} logo`}
        width={48}
        height={48}
        className="w-auto h-auto"
        priority
      />
      <div className="p-6 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = "/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
