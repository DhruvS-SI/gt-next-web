import { Public_Sans } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import "./globals.css"

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
})

export const metadata = {
  title: 'Gujarat Titans',
  description: 'Official Gujarat Titans Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}

