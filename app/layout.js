export const metadata = {
  title: 'Gujarat Titans',
  description: 'Official Gujarat Titans Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

