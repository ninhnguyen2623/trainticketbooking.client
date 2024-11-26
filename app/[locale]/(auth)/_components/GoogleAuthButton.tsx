"use client";

import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";

export default function GoogleAuthButton() {
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "en";
  const callbackUrl = `/${currentLocale}/dashboard/overview`;

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => signIn("google", { callbackUrl })}
    >
      <Icons.google className="tex mr-2" size={20} />
      Continue with Google
    </Button>
  );
}
