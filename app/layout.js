import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'Gujarat Titans',
  description: 'Official Gujarat Titans Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}

