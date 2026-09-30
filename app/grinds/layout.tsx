import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maths Grinds | Easy Maths",
  description:
    "Ask about clear, focused Junior Cycle and Leaving Cert maths grinds, available online or in person.",
  openGraph: {
    title: "Maths Grinds | Easy Maths",
    description: "Clear maths grinds, one useful step at a time. Ask about online or in-person options.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Maths Grinds | Easy Maths",
    description: "Clear maths grinds, one useful step at a time. Ask about online or in-person options.",
    images: [],
  },
};

export default function GrindsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
