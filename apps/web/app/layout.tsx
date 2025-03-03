import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import 'katex/dist/katex.min.css';

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";

//this is the title of the page as you see in the browser tab
const title = "MindDraft";
const description =
  "next-generation writing app designed to transform the writing process into a fully collaborative experience";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },

  metadataBase: new URL("https://mindcraft-next.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
