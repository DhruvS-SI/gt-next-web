'use client'

import Link from 'next/link'
import db from '../../data/db.json'

export default function Footer() {
  const footerLinks = db.footerMenuItems
  
  const mobileLinks = [
    { name: 'Terms & Conditions', href: '/terms-of-service' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Corporate Information', href: '/about' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="w-full text-white bg-primary-gradient-1 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/pattern-04.svg')] before:bg-no-repeat before:bg-cover before:opacity-30 before:z-0">
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-8 md:py-4">
        {/* Mobile Layout (below md) */}
        <div className="md:hidden flex flex-col items-center gap-4 mb-6">
          <nav>
            <ul className="flex items-center justify-center gap-3 text-sm font-medium text-white/80 flex-wrap">
              {mobileLinks.map((link, index) => (
                <li key={link.href} className="flex items-center gap-3">
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  {index < mobileLinks.length - 1 && (
                    <span className="text-white/40">|</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Copyright */}
        <div className="md:hidden text-center text-sm font-medium text-white/80 mb-6">
          &copy; Copyright {new Date().getFullYear()} Gujarat Titans. All Rights Reserved.
        </div>

        {/* Mobile Powered By */}
        <div className="md:hidden flex flex-col items-center gap-2">
          <div className="text-xs font-medium text-white/60">
            Powered By
          </div>
          <div>
            <img 
              src="/si-logo.svg" 
              alt="Sportz Interactive" 
              className="w-[50px]"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>

        {/* Desktop Layout (md and above) - Original */}
        <div className="hidden md:flex items-center justify-between">
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
      </div>

      {/* Scroll to top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-full right-4 md:right-6 w-10 h-10 bg-secondary flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
      >
        <svg 
          width="14" 
          height="8" 
          viewBox="0 0 14 8" 
          fill="none" 
          className="text-primary"
        >
          <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </footer>
  )
}

