'use client'

import Link from 'next/link'

import db from '../../data/db.json'

export default function Footer() {
  const footerLinks = db.footerMenuItems

  return (
    <footer className="w-full text-white border-t border-white/10 bg-primary-gradient-1 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/pattern-04.svg')] before:opacity-30 before:z-0">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10 flex min-h-[80px] items-center justify-between py-4">
        {/* Copyright */}
        <div className="text-sm font-medium text-white/80">
          &copy; Copyright {new Date().getFullYear()} Gujarat Titans. All Rights Reserved.
        </div>

        {/* Links */}
        <nav className="ml-auto mr-4">
            <ul className="flex items-center gap-2 text-sm font-medium text-white/80">
              {footerLinks.map((link, index) => (
                <li key={link.href} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.length - 1 && (
                      <span className="text-white/40">|</span>
                  )}
                </li>
              ))}
            </ul>
        </nav>

        {/* SI Logo */}
        <div>
            <img 
              src="/si-logo.svg" 
              alt="Sportz Interactive" 
              className="w-[50px]"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
        </div>
      </div>

       {/* Scroll to top */}
       <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-full right-6 w-10 h-10 bg-secondary flex items-center justify-center cursor-pointer"
       >
          <svg 
            width="14" 
            height="8" 
            viewBox="0 0 14 8" 
            fill="none" 
            className="text-primary group-hover:text-primary transition-colors"
          >
             <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
       </button>
    </footer>
  )
}

