import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "ErikarTech - Arquitectos del Futuro Digital | Desarrollo Web & Móvil",
  description:
    "Transformamos ideas complejas en experiencias web y móviles de alto impacto. Innovación digital de vanguardia.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo_erikartech.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo_erikartech.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo_erikartech.png",
        type: "image/png",
      },
    ],
    apple: "/logo_erikartech.png",
  },
}

import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
        <Toaster position="top-center" theme="dark" />
        <Analytics />
      </body>
    </html>
  )
}
