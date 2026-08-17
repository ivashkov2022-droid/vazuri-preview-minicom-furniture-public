import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") || incoming.get("host") || "localhost:4195";
  const protocol = incoming.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const image = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: "MODO — Contemporary Furniture",
    description: "Contemporary furniture and thoughtful objects for calm, lived-in spaces.",
    openGraph: {
      title: "MODO — Contemporary Furniture",
      description: "Objects for a quieter home.",
      images: [{ url: image, width: 1536, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "MODO — Contemporary Furniture",
      description: "Objects for a quieter home.",
      images: [image],
    },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
