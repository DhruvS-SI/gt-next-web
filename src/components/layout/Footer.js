import Link from 'next/link'

export default function Footer() {
  const footerLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ]

  return (
    <footer className="bg-[#1a2744] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#d4af37] font-bold text-xl">
            Gujarat Titans
          </div>
          
          <nav>
            <ul className="flex items-center gap-6 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="hover:text-[#d4af37] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gujarat Titans. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

