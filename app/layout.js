import { Public_Sans } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
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
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}

