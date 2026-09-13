import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://easymaths.ie",
  ),
  title: "20 Second Maths Challenge | North Dublin Maths",
  description:
    "Take the 20 second maths challenge, check the worked answer, and find the first topics worth revisiting.",
  openGraph: {
    title: "20 Second Maths Challenge",
    description: "Can you get it without a calculator?",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "20 Second Maths Challenge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "20 Second Maths Challenge",
    description: "Can you get it without a calculator?",
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
