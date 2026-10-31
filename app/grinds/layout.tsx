import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free introductory Leaving Cert maths session | Easy Maths",
  description:
    "A free 45-minute introductory Leaving Cert maths session, at home or remote, with three study tools to keep. Available for a limited introductory period.",
  openGraph: {
    title: "Free introductory Leaving Cert maths session | Easy Maths",
    description: "A practical 45-minute session at home or remote, with three free study tools to keep.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Free introductory Leaving Cert maths session | Easy Maths",
    description: "A practical 45-minute session at home or remote, with three free study tools to keep.",
    images: [],
  },
};

export default function GrindsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
