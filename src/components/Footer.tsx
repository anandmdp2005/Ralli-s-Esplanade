import React from 'react';
import { Phone, MapPin, ExternalLink, Star, Heart, Settings, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConfig }) => {
  return (
    <footer className="bg-[#081710] text-[#EFE8DA] border-t border-[#C5A059]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand & Introduction */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#C5A059]/50 bg-[#0F261C] flex items-center justify-center text-[#D8B26E] font-serif font-bold text-xl">
                R
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#F7F3EA] leading-none">
                  {RESTAURANT_INFO.name}
                </h3>
                <span className="text-xs uppercase tracking-widest text-[#D8B26E] font-medium block mt-1">
                  Chowringhee · Kolkata
                </span>
              </div>
            </div>

            <p className="text-xs text-[#EFE8DA]/75 leading-relaxed pr-4">
              A trusted culinary stop at 10-D Jawahar Lal Nehru Road. Dedicated to offering authentic, freshly prepared dishes, rich curries, fragrant biryanis, and warm Kolkata hospitality.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[#D8B26E] font-semibold pt-1">
              <Star className="w-4 h-4 fill-[#D8B26E]" />
              <span className="text-[#F7F3EA]">5.0 Stars</span>
              <span className="text-[#EFE8DA]/60">· 1,349 Verified Google Reviews</span>
            </div>
          </div>

          {/* Quick Menu Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D8B26E]">
              Site Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE8DA]/80">
              <li>
                <a href="#about" className="hover:text-[#D8B26E] transition-colors">
                  About the Restaurant
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D8B26E] transition-colors">
                  Food Menu & Dishes
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D8B26E] transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#rating" className="hover:text-[#D8B26E] transition-colors">
                  Google Rating Profile
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D8B26E] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#D8B26E] transition-colors">
                  Location & Map
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D8B26E] transition-colors">
                  Table Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Google Maps & Review Links (Required Item 9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D8B26E]">
              Google Maps & Reviews
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EFE8DA]/80">
              <li>
                <a
                  href={RESTAURANT_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#F7F3EA] hover:text-[#D8B26E] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>View All Google Reviews (1,349)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D8B26E]" />
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D8B26E] inline-flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Google Maps Business Listing</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="hover:text-[#D8B26E] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call: {RESTAURANT_INFO.phone}</span>
                </a>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenConfig}
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#D8B26E] hover:underline"
                >
                  <Settings className="w-3 h-3" />
                  <span>Google Places API Setup Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Address & Hours */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#EFE8DA]/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D8B26E]">
              Address & Hours
            </h4>
            <p className="leading-relaxed">
              <strong>Ralli's Esplanade</strong>
              <br />
              10-D, Jawahar Lal Nehru Road, Chowringhee Pl,
              <br />
              Kolkata, West Bengal 700013, India
            </p>

            <div className="pt-2 border-t border-white/10 space-y-1">
              <p className="flex items-center gap-1.5 text-[#F7F3EA] font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#D8B26E]" />
                <span>11:00 AM – 11:00 PM Daily</span>
              </p>
              <p className="text-[11px] text-[#EFE8DA]/60">
                Opposite Esplanade Metro Station
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Attributions & Rights */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFE8DA]/60">
          <p>
            © {new Date().getFullYear()} Ralli's Esplanade. All verified business data adheres to official Google Maps listing guidelines.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={RESTAURANT_INFO.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8B26E] hover:underline flex items-center gap-1"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <button onClick={onOpenConfig} className="text-[#EFE8DA]/75 hover:text-[#D8B26E] underline">
              Google Maps Platform Config
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
