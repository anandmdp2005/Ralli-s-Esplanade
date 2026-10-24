import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Menu, X, Star, ExternalLink, Settings } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenConfig: () => void;
  apiStatus: 'LIVE_VERIFIED' | 'NEEDS_CONFIGURATION' | 'LOADING';
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConfig, apiStatus }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Rating', href: '#rating' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F261C]/95 backdrop-blur-md shadow-md py-3 text-[#F7F3EA] border-b border-[#C5A059]/20'
          : 'bg-gradient-to-b from-[#081710]/90 to-transparent py-5 text-[#F7F3EA]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#C5A059]/40 bg-[#081710] flex items-center justify-center text-[#D8B26E] font-serif font-bold text-xl shadow-inner group-hover:border-[#C5A059] transition-colors">
              R
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#F7F3EA] block leading-none">
                {RESTAURANT_INFO.name}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#D8B26E] font-medium block mt-0.5">
                Chowringhee · Kolkata
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#EFE8DA]/80 hover:text-[#D8B26E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Call Now & Get Directions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Status / Config Button */}
            <button
              onClick={onOpenConfig}
              title="Google Maps Platform API Status"
              className="px-2.5 py-1.5 rounded-md text-xs font-medium border border-[#C5A059]/30 text-[#D8B26E] hover:bg-[#C5A059]/10 transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">
                {apiStatus === 'LIVE_VERIFIED' ? 'Google API: Live' : 'API Guide'}
              </span>
            </button>

            {/* Call Now Button */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#17382B] text-[#F7F3EA] border border-[#C5A059]/30 hover:border-[#C5A059] hover:bg-[#214C3B] text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#D8B26E]" />
              <span>Call {RESTAURANT_INFO.phone}</span>
            </a>

            {/* Directions Button */}
            <a
              href={RESTAURANT_INFO.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C5A059] text-[#081710] hover:bg-[#D8B26E] text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Directions</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="p-2 rounded-md bg-[#17382B] text-[#D8B26E] border border-[#C5A059]/30"
              aria-label="Call restaurant"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#F7F3EA] hover:text-[#D8B26E] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F261C] border-b border-[#C5A059]/20 px-6 py-6 animate-fadeIn">
          <div className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#EFE8DA] hover:text-[#D8B26E] py-1 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-[#17382B] text-[#F7F3EA] border border-[#C5A059]/40 text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-[#D8B26E]" />
                <span>Call Restaurant ({RESTAURANT_INFO.phone})</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-[#C5A059] text-[#081710] text-sm font-bold"
              >
                <MapPin className="w-4 h-4" />
                <span>Get Directions (Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConfig();
                }}
                className="flex items-center justify-center gap-2 w-full py-2 text-xs text-[#D8B26E] border border-[#C5A059]/20 rounded-md"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Google Places API Setup & Info</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
