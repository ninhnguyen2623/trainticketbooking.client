import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard: Edit Train"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
