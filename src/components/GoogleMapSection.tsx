import React from 'react';
import { MapPin, Navigation, ExternalLink, Train, Car, Footprints, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const GoogleMapSection: React.FC = () => {
  // Safe Google Maps Search Embed query without exposing private API keys in client
  const mapEmbedUrl = `https://maps.google.com/maps?q=10-D,+Jawahar+Lal+Nehru+Road,+Chowringhee+Pl,+Kolkata,+West+Bengal+700013&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-20 lg:py-28 bg-[#FBF9F5] text-[#1E2922] relative border-t border-[#E3D9C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#A8833F] font-semibold">
            Find Our Dining Room
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F261C]">
            Location & Directions
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          <p className="mt-4 text-base text-[#1E2922]/80 leading-relaxed">
            Conveniently situated along Jawaharlal Nehru Road in Chowringhee, minutes away from the Esplanade interchange and historic shopping areas.
          </p>
        </div>

        {/* Map & Transit Information Card */}
        <div className="bg-white rounded-xl border border-[#E3D9C4] overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Interactive Embedded Map */}
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[460px] bg-[#EFE8DA]">
              <iframe
                title="Google Map Location of Ralli's Esplanade"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              
              {/* Floating Map Pin Badge */}
              <div className="absolute top-4 left-4 bg-[#0F261C] text-[#F7F3EA] px-3.5 py-2 rounded-md shadow-md border border-[#C5A059]/40 flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-[#D8B26E]" />
                <span className="font-semibold">{RESTAURANT_INFO.name}</span>
              </div>
            </div>

            {/* Right Column: Address Details, Transit Guide & Primary Direction CTA */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-[#FDFBF7]">
              
              <div>
                <span className="text-[11px] font-bold text-[#A8833F] uppercase tracking-wider block">
                  Official Address
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0F261C] mt-1">
                  {RESTAURANT_INFO.name}
                </h3>
                <p className="mt-2 text-sm text-[#1E2922]/85 font-medium leading-relaxed">
                  {RESTAURANT_INFO.address}
                </p>
                <p className="mt-1 text-xs text-[#1E2922]/65">
                  Opposite Esplanade Metro Station, Chowringhee Place, Kolkata, West Bengal 700013
                </p>
              </div>

              {/* Transit Recommendations */}
              <div className="space-y-3 pt-2 border-t border-[#E3D9C4]">
                <span className="text-xs font-semibold text-[#0F261C] block">
                  How to Reach Us
                </span>

                <div className="flex items-start gap-3 text-xs text-[#1E2922]/80">
                  <Train className="w-4 h-4 text-[#A8833F] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0F261C]">Via Kolkata Metro:</span>{' '}
                    Take Blue Line or Green Line to Esplanade Station. Exit toward Chowringhee Place (approx. 2-minute walk).
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-[#1E2922]/80">
                  <Footprints className="w-4 h-4 text-[#A8833F] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0F261C]">From New Market:</span>{' '}
                    Head westward on Lindsay Street toward Jawaharlal Nehru Road (approx. 3-minute walk).
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-[#1E2922]/80">
                  <Car className="w-4 h-4 text-[#A8833F] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0F261C]">Taxi & Cab Drop-Off:</span>{' '}
                    Direct curbside stop on Jawaharlal Nehru Road at Chowringhee Place.
                  </div>
                </div>
              </div>

              {/* Verified Hours Quick Peek */}
              <div className="p-3.5 rounded-md bg-[#F7F3EA] border border-[#E3D9C4] flex items-center gap-3 text-xs">
                <Clock className="w-4 h-4 text-[#A8833F] shrink-0" />
                <div>
                  <span className="font-semibold text-[#0F261C]">Open Daily:</span> 11:00 AM – 11:00 PM
                </div>
              </div>

              {/* Prominent GET DIRECTIONS CTA (Required Item 7) */}
              <div className="pt-2">
                <a
                  href={RESTAURANT_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-md bg-[#0F261C] text-[#F7F3EA] hover:bg-[#17382B] text-sm font-bold tracking-wide transition-all shadow-md group"
                >
                  <Navigation className="w-4 h-4 text-[#D8B26E] group-hover:rotate-12 transition-transform" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#EFE8DA]/60" />
                </a>
                <p className="text-[11px] text-[#1E2922]/55 text-center mt-2">
                  Direct navigation opens in your phone or browser Google Maps app
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
