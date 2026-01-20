import Link from 'next/link'

import db from '../../data/db.json'

export default function Footer() {
  const footerLinks = db.footerMenuItems

  return (
    <footer className="bg-primary text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-secondary font-bold text-xl">
            Gujarat Titans
          </div>

          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors duration-200"
                  >
                    {link.name}
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

