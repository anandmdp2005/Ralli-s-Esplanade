import React from 'react';
import { Phone, MapPin, UtensilsCrossed, Star, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onViewMenuClick: () => void;
  apiStatus: string;
}

export const Hero: React.FC<HeroProps> = ({ onViewMenuClick, apiStatus }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-[#081710] text-[#F7F3EA] overflow-hidden pt-24 pb-16 lg:py-32">
      {/* Subtle luxury ambient texture overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-cover bg-center"
        style={{
          backgroundImage: `radial-gradient(circle at 75% 20%, rgba(197, 160, 89, 0.25) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(23, 56, 43, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Subtle geometric gold accent border lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Branding, Editorial Title & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Rating & Trust Meta Banner (Supplied Google Maps Listing Data) */}
            <div className="inline-flex items-center flex-wrap gap-2 text-xs text-[#EFE8DA]/90 font-medium">
              <span className="text-[#D8B26E] font-semibold tracking-wide uppercase text-[11px]">
                Kolkata Dining Landmark
              </span>
              <span className="text-[#C5A059]/50" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 text-[#F7F3EA]">
                <div className="flex items-center text-[#D8B26E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D8B26E] text-[#D8B26E]" />
                  ))}
                </div>
                <span className="font-bold text-[#F7F3EA]">{RESTAURANT_INFO.googleRating}.0</span>
                <span className="text-[#EFE8DA]/70">
                  ({RESTAURANT_INFO.googleReviewCount.toLocaleString()} Google Reviews)
                </span>
              </div>
              <span className="text-[#C5A059]/50" aria-hidden="true">·</span>
              <span className="text-[11px] text-[#D8B26E]/80 italic">
                {apiStatus === 'LIVE_VERIFIED' ? 'Live API Verified' : 'Supplied Listing Data'}
              </span>
            </div>

            {/* Main Editorial Restaurant Title */}
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F3EA] leading-[1.12]">
                {RESTAURANT_INFO.name}
              </h1>
              <p className="mt-2 font-serif text-xl sm:text-2xl text-[#D8B26E] italic font-normal">
                Authentic Flavors & Gracious Hospitality in Chowringhee
              </p>
            </div>

            {/* Grounded Description */}
            <p className="text-base sm:text-lg text-[#EFE8DA]/85 max-w-2xl leading-relaxed">
              Step into an inviting culinary haven situated at 10-D Jawahar Lal Nehru Road. Serving cherished North Indian recipes, rich gravies, savory tandoor starters, and refreshing beverages tailored for family feasts and travelers visiting Kolkata.
            </p>

            {/* Verified Address & Landmark Highlight */}
            <div className="flex items-start gap-3 py-2 text-sm text-[#EFE8DA]/80">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
              <span>
                <strong className="text-[#F7F3EA] font-semibold">{RESTAURANT_INFO.address}</strong>
                <span className="block text-xs text-[#EFE8DA]/60 mt-0.5">Opposite Esplanade Metro Station, Chowringhee Place, Kolkata</span>
              </span>
            </div>

            {/* Action Buttons: View Menu, Call Now, Get Directions */}
            <div className="pt-2 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              
              {/* 1. View Menu */}
              <button
                onClick={onViewMenuClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md bg-[#C5A059] text-[#081710] hover:bg-[#D8B26E] font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>View Menu</span>
              </button>

              {/* 2. Call Now */}
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-md bg-[#17382B] text-[#F7F3EA] border border-[#C5A059]/40 hover:bg-[#214C3B] hover:border-[#C5A059] font-medium text-sm transition-all active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 text-[#D8B26E]" />
                <span>Call Now: {RESTAURANT_INFO.phone}</span>
              </a>

              {/* 3. Get Directions */}
              <a
                href={RESTAURANT_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-[#0F261C] text-[#EFE8DA] border border-[#EFE8DA]/20 hover:border-[#C5A059] hover:text-[#D8B26E] font-medium text-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#EFE8DA]/60" />
              </a>
            </div>

            {/* Quick Micro Details */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#EFE8DA]/75 border-t border-white/10 w-full">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Open Daily: 11 AM – 11 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Hygienic & Fresh Dining</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Star className="w-4 h-4 text-[#D8B26E] shrink-0" />
                <span>1,349+ Customer Ratings</span>
              </div>
            </div>

          </div>

          {/* Right Column: Refined Food Photography Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative gold backdrop frame */}
              <div className="absolute -inset-2 rounded-2xl border border-[#C5A059]/30 transform rotate-1 pointer-events-none" />
              
              {/* Primary Image Container */}
              <div className="relative rounded-xl overflow-hidden bg-[#0F261C] shadow-2xl border border-[#C5A059]/40 aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=85"
                  alt="Delicious Indian dining platter at Ralli's Esplanade"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081710] via-transparent to-transparent opacity-80" />

                {/* Overlaid caption badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#081710]/85 backdrop-blur-md border border-[#C5A059]/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-base font-semibold text-[#F7F3EA]">
                        Culinary Heritage at Chowringhee
                      </p>
                      <p className="text-xs text-[#D8B26E] mt-0.5">
                        Fresh Dum Biryani, Rich Curries & Traditional Refreshments
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-wider text-[#EFE8DA]/70 block">Rating</span>
                      <span className="font-bold text-sm text-[#F7F3EA] flex items-center gap-1 justify-end">
                        5.0 <Star className="w-3.5 h-3.5 fill-[#D8B26E] text-[#D8B26E]" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating review count stamp */}
              <div className="absolute -top-4 -left-4 bg-[#17382B] border border-[#C5A059]/50 shadow-xl rounded-lg p-3 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#D8B26E]">
                  <Star className="w-5 h-5 fill-[#D8B26E]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#EFE8DA]/70 uppercase tracking-widest block font-medium">Google Listing</span>
                  <span className="text-sm font-bold text-[#F7F3EA]">5.0 Stars · 1,349 Reviews</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
