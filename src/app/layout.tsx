import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IP Trace | Track Your IP Address Changes",
  description: "Monitor and track changes to your IP address over time. IP Trace helps you keep a history of your IP addresses with timestamps and source information.",
  keywords: ["IP tracker", "IP address history", "IP monitoring", "IP changes", "IP trace"],
  authors: [{ name: "farhancdr" }],
  creator: "farhancdr",
  publisher: "farhancdr",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ip-trace.vercel.app/",
    title: "IP Trace | Track Your IP Address Changes",
    description: "Monitor and track changes to your IP address over time with detailed history and source information.",
    siteName: "IP Trace",
    images: [
      {
        url: "/og-image.png", // Create this image in your public folder
        width: 1200,
        height: 630,
        alt: "IP Trace - Track Your IP Address Changes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Trace | Track Your IP Address Changes",
    description: "Monitor and track changes to your IP address over time with detailed history and source information.",
    creator: "@farhancdr",
    images: ["/og-image.png"], // Same image as OpenGraph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code", // Add your verification code when you have it
  },
  alternates: {
    canonical: "https://ip-trace.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
