import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "€25 Maths Clarity Session | Easy Maths",
  description:
    "A focused 60-minute Leaving Cert Maths Clarity Session. Bring the topic, test or exam question that is causing difficulty.",
  openGraph: {
    title: "€25 Maths Clarity Session | Easy Maths",
    description: "One useful maths session and a clear next step. Online or in person around North Fingal.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "€25 Maths Clarity Session | Easy Maths",
    description: "One useful maths session and a clear next step. Online or in person around North Fingal.",
    images: [],
  },
};

export default function GrindsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
