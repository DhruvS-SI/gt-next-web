import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/team">Team</Link></li>
        <li><Link href="/matches">Matches</Link></li>
        <li><Link href="/news">News</Link></li>
        <li><Link href="/tickets">Tickets</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/gallery">Gallery</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  )
}

