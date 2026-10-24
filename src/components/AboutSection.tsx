import React from 'react';
import { MapPin, Phone, CheckCircle2, Shield, HeartHandshake, Compass } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FBF9F5] text-[#1E2922] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-[#A8833F] font-semibold">
            About Our Dining Room
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F261C]">
            Hospitality in Central Kolkata
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          <p className="mt-4 text-base text-[#1E2922]/80 leading-relaxed">
            Situated at 10-D Jawahar Lal Nehru Road in Chowringhee Place, Ralli's Esplanade serves hearty meals and flavorful dining experiences in one of the most vibrant corners of the City of Joy.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Vignettes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-lg overflow-hidden shadow-lg border border-[#E3D9C4]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="Welcoming restaurant atmosphere at Ralli's Esplanade"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
              <div className="p-4 bg-[#F7F3EA] border-t border-[#E3D9C4]">
                <div className="flex items-center gap-2 text-xs text-[#0F261C] font-semibold">
                  <MapPin className="w-4 h-4 text-[#A8833F]" />
                  <span>10-D, Jawahar Lal Nehru Road, Chowringhee Pl, Kolkata 700013</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-lg bg-white border border-[#E3D9C4] shadow-sm">
                <p className="text-2xl font-serif font-bold text-[#0F261C]">1,349+</p>
                <p className="text-xs text-[#1E2922]/70 mt-1 font-medium">Customer Reviews on Google Maps</p>
              </div>
              <div className="p-5 rounded-lg bg-white border border-[#E3D9C4] shadow-sm">
                <p className="text-2xl font-serif font-bold text-[#0F261C]">5.0 ★</p>
                <p className="text-xs text-[#1E2922]/70 mt-1 font-medium">Verified Google Rating Profile</p>
              </div>
            </div>
          </div>

          {/* Right Column: Grounded Introduction Prose */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0F261C]">
                A Welcoming Table at Kolkata's Epicenter
              </h3>
              <p className="mt-3 text-base text-[#1E2922]/85 leading-relaxed">
                Whether you are stepping out of the Esplanade Metro Station, exploring the bustling lanes of historic New Market, or strolling along Jawaharlal Nehru Road, Ralli's Esplanade provides an unhurried, comfortable dining environment.
              </p>
              <p className="mt-3 text-base text-[#1E2922]/85 leading-relaxed">
                Our kitchen emphasizes honest ingredients, careful seasoning, and fresh preparation. From comforting vegetable curries and slow-simmered lentils to sizzling tandoor plates and fragrant biryanis, every plate is crafted to provide dependable quality and robust taste.
              </p>
            </div>

            {/* Core Commitments List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-md bg-[#F7F3EA] border border-[#E3D9C4]">
                <Shield className="w-5 h-5 text-[#A8833F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0F261C]">Freshness & Hygiene</h4>
                  <p className="text-xs text-[#1E2922]/75 mt-0.5">
                    Strict cleanliness standards in ingredient handling and dining room sanitization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-md bg-[#F7F3EA] border border-[#E3D9C4]">
                <HeartHandshake className="w-5 h-5 text-[#A8833F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0F261C]">Gracious Service</h4>
                  <p className="text-xs text-[#1E2922]/75 mt-0.5">
                    Attentive, courteous staff dedicated to making every guest feel at home.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-md bg-[#F7F3EA] border border-[#E3D9C4]">
                <Compass className="w-5 h-5 text-[#A8833F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0F261C]">Prime Central Spot</h4>
                  <p className="text-xs text-[#1E2922]/75 mt-0.5">
                    Convenient meeting point right by Chowringhee Place with simple transit access.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-md bg-[#F7F3EA] border border-[#E3D9C4]">
                <CheckCircle2 className="w-5 h-5 text-[#A8833F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0F261C]">Dine-In & Takeaway</h4>
                  <p className="text-xs text-[#1E2922]/75 mt-0.5">
                    Enjoy leisurely sit-down meals or grab carefully packaged takeaway meals.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Callout */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-sm">
              <span className="text-[#1E2922]/80">Questions or group reservations?</span>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="inline-flex items-center gap-1.5 font-semibold text-[#0F261C] hover:text-[#A8833F] underline underline-offset-4"
              >
                <Phone className="w-4 h-4 text-[#A8833F]" />
                <span>Call our team at {RESTAURANT_INFO.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
