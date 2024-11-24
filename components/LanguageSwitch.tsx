"use client";

import { IconCheck } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { Button } from "./custom/Button";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import clsx from "clsx";
import { routing, usePathname } from "@/i18n/routing";
import { useRouter } from "next/navigation";

export default function LanguageSwitch() {
  const t = useTranslations("LocaleSwitcher");
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const handleLanguageChange = (nextLocale: string) => {
    startTransition(() => {
      const newPath = `/${nextLocale}${pathname}`;
      router.replace(newPath);
      router.refresh();
    });
  };
  const localeMapping: any = {
    vi: { label: "Tiếng Việt", flag: "fi-vn" },
    en: { label: "English", flag: "fi-gb" }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className={clsx(
            "flex scale-95 content-between items-center rounded-full",
            {
              "transition-opacity [&:disabled]:opacity-30": isPending
            }
          )}
        >
          <span className={`fi ${localeMapping[locale]?.flag} mr-2`} />
          {t("locale", { locale })}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((cur) => (
          <DropdownMenuItem key={cur} onClick={() => handleLanguageChange(cur)}>
            <span className={`fi ${localeMapping[cur]?.flag}`} />
            {t("locale", { locale: cur })}
            <IconCheck
              size={14}
              className={`ml-auto ${locale === cur ? "block" : "hidden"}`}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
