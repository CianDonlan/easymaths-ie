import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://easymaths.ie",
  ),
  title: "60 Second Maths Challenge | Easy Maths",
  description:
    "Try the 60 second maths challenge, check your answer, or solve it step by step with a little help.",
  openGraph: {
    title: "60 Second Maths Challenge",
    description: "Check your answer or solve it step by step.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Maths challenge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "60 Second Maths Challenge",
    description: "Check your answer or solve it step by step.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
