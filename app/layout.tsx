import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloClientProvider } from "./api/ApolloClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noryo",
  description: "Noryo healthcare management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dau4ouf.css" />
      </head>
      <body className="card-container">
        <div data-tauri-drag-region className="drag-bar">
          {/* Optional: Title or leave blank for traffic lights space */}
          <span className="text-xs text-gray-500 pointer-events-none">
            Noryo
          </span>
        </div>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
