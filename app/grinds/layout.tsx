import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The €3.14 Leaving Cert Maths Masterplan | Easy Maths",
  description:
    "A limited 45-minute introductory session in North County Dublin that shows Leaving Cert students how to study maths independently.",
  openGraph: {
    title: "The €3.14 Leaving Cert Maths Masterplan | Easy Maths",
    description: "A practical 45-minute study session with three printed tools to keep.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "The €3.14 Leaving Cert Maths Masterplan | Easy Maths",
    description: "A practical 45-minute study session with three printed tools to keep.",
    images: [],
  },
};

export default function GrindsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
