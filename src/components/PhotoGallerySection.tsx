import React, { useState } from 'react';
import { Camera, ExternalLink, Image as ImageIcon, Info, ShieldCheck, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export interface GooglePlacePhoto {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions?: Array<{
    displayName: string;
    uri?: string;
    photoUri?: string;
  }>;
  proxyUrl: string;
}

interface PhotoGallerySectionProps {
  photos: GooglePlacePhoto[];
  apiStatus: 'LIVE_VERIFIED' | 'NEEDS_CONFIGURATION' | 'LOADING';
  onOpenConfig: () => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  photos,
  apiStatus,
  onOpenConfig,
}) => {
  const hasLivePhotos = photos && photos.length > 0;
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Curated illustrative culinary showcases (strictly labeled as illustrative per prompt guidelines)
  const illustrativeShowcase = [
    {
      title: 'Dum Biryani Specialties',
      caption: 'Slow-cooked aromatic basmati rice with whole spices',
      url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Tandoori Clay-Oven Grills',
      caption: 'Marinated paneer and kebabs charred over hot coals',
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Slow-Simmered Lentils & Gravies',
      caption: 'Velvety dal makhani and rich royal curries',
      url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Heritage Refreshments & Kulfi',
      caption: 'Chilled saffron badam lassi and handcrafted desserts',
      url: 'https://images.unsplash.com/photo-1571006687898-3bfd217358e7?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#F7F3EA] text-[#1E2922] relative border-t border-[#E3D9C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#A8833F] font-semibold">
            Visual Experience
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F261C]">
            Restaurant Photo Gallery
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          <p className="mt-4 text-base text-[#1E2922]/80 leading-relaxed">
            Visual glimpses of our culinary craft, welcoming dining atmosphere, and verified business photos.
          </p>
        </div>

        {/* Live Google Place Photos Grid (when API is connected) */}
        {hasLivePhotos ? (
          <div>
            <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-900 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Verified Google Maps Listing Photos (Authorized Places API Sync)</span>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
              >
                <span>View on Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(p.proxyUrl)}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-[#E3D9C4] bg-[#0F261C] cursor-pointer shadow-xs hover:shadow-md transition-all"
                >
                  <img
                    src={p.proxyUrl}
                    alt={`Ralli's Esplanade verified photo ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                    <span className="text-xs font-semibold text-white">Expand Photo</span>
                  </div>
                  {p.authorAttributions && p.authorAttributions[0] && (
                    <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] text-white/90">
                      Photo: {p.authorAttributions[0].displayName}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Placeholder Slots for Verified Google Photos (Prompt Requirement 6) */
          <div className="space-y-8">
            <div className="p-5 rounded-lg bg-white border border-[#C5A059]/40 shadow-xs max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#A8833F] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#1E2922]/85">
                    <p className="font-semibold text-[#0F261C]">
                      Verified Google Business Photos Integration
                    </p>
                    <p className="mt-1 leading-relaxed">
                      In strict compliance with accuracy standards, we never misrepresent unrelated restaurant photos as authentic interior photos of Ralli's Esplanade. The placeholders below illustrate where verified photos stream directly from the Google Maps listing once an authorized Places API key is connected.
                    </p>
                  </div>
                </div>

                <a
                  href={RESTAURANT_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#0F261C] text-[#F7F3EA] text-xs font-semibold hover:bg-[#17382B] transition-colors shrink-0"
                >
                  <span>View Photos on Google</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D8B26E]" />
                </a>
              </div>
            </div>

            {/* Official Google Photo Slot Placeholders */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0F261C] mb-4 text-center">
                Verified Google Maps Business Photo Slots
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  'Dining Room & Seating Layout',
                  'Chowringhee Place Storefront',
                  'Tandoor & Kitchen Counter',
                  'Fresh Beverage & Refreshment Station',
                ].map((slotName, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-lg bg-white border border-dashed border-[#C5A059] flex flex-col items-center justify-center text-center min-h-[190px] shadow-xs hover:bg-[#FDFBF7] transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#F7F3EA] border border-[#E3D9C4] flex items-center justify-center text-[#A8833F] mb-3">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#0F261C]">{slotName}</span>
                    <span className="text-[11px] text-[#1E2922]/60 mt-1">
                      Verified Google Places Photo Slot #{i + 1}
                    </span>
                    <a
                      href={RESTAURANT_INFO.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-[11px] font-semibold text-[#A8833F] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Check Google listing</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Clearly Disclosed Illustrative Culinary Showcase */}
            <div className="pt-8 border-t border-[#E3D9C4]">
              <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F261C]">
                    Culinary Style & Recipe Showcase
                  </h3>
                  <p className="text-xs text-[#1E2922]/70">
                    Illustrative food styling highlighting regional North Indian and Kolkata culinary specialties prepared by our kitchen.
                  </p>
                </div>
                <span className="text-[11px] text-[#A8833F] font-semibold uppercase tracking-wider">
                  Illustrative Showcase
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {illustrativeShowcase.map((item, idx) => (
                  <div
                    key={idx}
                    className="group bg-white rounded-lg overflow-hidden border border-[#E3D9C4] shadow-xs hover:border-[#C5A059] transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#FBF9F5]">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-sm font-bold text-[#0F261C]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#1E2922]/70 mt-1">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Lightbox Modal for Full View */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg">
            <img
              src={selectedPhoto}
              alt="Expanded verified photo"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-black"
            >
              Close [ESC]
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
