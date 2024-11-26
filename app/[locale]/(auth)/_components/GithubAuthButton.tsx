"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";

export default function GithubSignInButton() {
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "en";
  const callbackUrl = `/${currentLocale}/dashboard/overview`;

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => signIn("github", { callbackUrl })}
    >
      <Icons.gitHub className="mr-2" size={20} />
      Continue with Github
    </Button>
  );
}
