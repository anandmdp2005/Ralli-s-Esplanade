import React from 'react';
import { Star, ShieldAlert, ExternalLink, ShieldCheck, Settings, MessageSquare, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export interface GoogleReviewItem {
  id: string;
  authorName: string;
  authorPhotoUrl?: string | null;
  authorUri?: string;
  rating: number;
  relativePublishTimeDescription?: string;
  originalText: string;
  publishTime?: string;
}

interface GoogleReviewsSectionProps {
  reviews: GoogleReviewItem[];
  apiStatus: 'LIVE_VERIFIED' | 'NEEDS_CONFIGURATION' | 'LOADING';
  onOpenConfig: () => void;
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({
  reviews,
  apiStatus,
  onOpenConfig,
}) => {
  const hasLiveReviews = reviews && reviews.length > 0;

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#FBF9F5] text-[#1E2922] relative border-t border-[#E3D9C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#A8833F] font-semibold">
            Verified Customer Voice
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F261C]">
            Customer Reviews
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          <p className="mt-4 text-base text-[#1E2922]/80 leading-relaxed">
            Genuine testimonials from visitors at Ralli's Esplanade. We uphold 100% integrity: only verified Google reviews are displayed, with zero fabricated or simulated feedback.
          </p>
        </div>

        {/* Integration Status Notice */}
        {hasLiveReviews ? (
          <div className="mb-8 p-4 rounded-lg bg-emerald-50 border border-emerald-200 max-w-4xl mx-auto flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-900">
              <span className="font-semibold">Live Google Places API Synchronized: </span>
              Displaying {reviews.length} authentic customer review{reviews.length > 1 ? 's' : ''} retrieved directly from the verified Ralli's Esplanade Google listing. For all 1,349 reviews, visit our Google Maps page.
            </div>
          </div>
        ) : (
          <div className="mb-10 p-5 rounded-lg bg-[#F7F3EA] border border-[#C5A059]/40 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#A8833F] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#1E2922]/85">
                  <p className="font-semibold text-[#0F261C]">
                    Google Places API Verification Protocol
                  </p>
                  <p className="mt-1 leading-relaxed">
                    Under Google API policies and ethical guidelines, we never scrape Google Maps or fabricate fictional customer names or testimonials. Customer reviews will render here automatically once an authorized Google Maps Platform API Key and Place ID are provided.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={onOpenConfig}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white border border-[#C5A059] text-xs font-semibold text-[#0F261C] hover:bg-[#F7F3EA] transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-[#A8833F]" />
                  <span>Configure API</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Grid (if live reviews exist) */}
        {hasLiveReviews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-lg p-5 border border-[#E3D9C4] shadow-xs flex flex-col justify-between hover:border-[#C5A059] transition-all"
              >
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-center gap-3 mb-3">
                    {rev.authorPhotoUrl ? (
                      <img
                        src={rev.authorPhotoUrl}
                        alt={rev.authorName}
                        className="w-10 h-10 rounded-full object-cover border border-[#E3D9C4]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#0F261C] text-[#D8B26E] font-serif font-bold text-sm flex items-center justify-center">
                        {rev.authorName ? rev.authorName.charAt(0) : 'G'}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold text-[#0F261C] truncate">
                        {rev.authorName}
                      </p>
                      <p className="text-[11px] text-[#1E2922]/60">
                        {rev.relativePublishTimeDescription || 'Google Reviewer'}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-2.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-[#D8B26E] text-[#D8B26E]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Prose */}
                  <p className="text-xs text-[#1E2922]/80 leading-relaxed italic line-clamp-5">
                    "{rev.originalText}"
                  </p>
                </div>

                {/* Footer Attribution */}
                <div className="mt-4 pt-3 border-t border-[#E3D9C4]/60 flex items-center justify-between text-[11px] text-[#1E2922]/60">
                  <span>Verified Google Review</span>
                  <a
                    href={rev.authorUri || RESTAURANT_INFO.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A8833F] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>View original</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty / Awaiting API Configuration Presentation */
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-[#E3D9C4] p-8 sm:p-10 text-center shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#F7F3EA] border border-[#C5A059]/40 flex items-center justify-center mx-auto mb-4 text-[#A8833F]">
              <MessageSquare className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#0F261C]">
              Genuine Customer Reviews on Google Maps
            </h3>
            
            <p className="mt-2 text-sm text-[#1E2922]/80 max-w-xl mx-auto leading-relaxed">
              Ralli's Esplanade has earned <strong>1,349 genuine reviews</strong> with a <strong>5.0 Star rating</strong> on Google Maps from satisfied diners in Chowringhee.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#0F261C] text-[#F7F3EA] hover:bg-[#17382B] text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                <span>Read All 1,349 Reviews on Google Maps</span>
                <ExternalLink className="w-4 h-4 text-[#D8B26E]" />
              </a>

              <button
                onClick={onOpenConfig}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-md bg-white border border-[#E3D9C4] hover:border-[#C5A059] text-xs font-medium text-[#1E2922] transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-[#A8833F]" />
                <span>API Setup Guide</span>
              </button>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E3D9C4]/60 text-[11px] text-[#1E2922]/60">
              Note: Reviews are presented in accordance with Google Places API policies. Direct Google Maps URL:{' '}
              <a
                href={RESTAURANT_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A8833F] underline break-all"
              >
                {RESTAURANT_INFO.googleMapsLink}
              </a>
            </div>
          </div>
        )}

        {/* Section Footer: View All Link & Official Attribution */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E3D9C4] pt-6 max-w-5xl mx-auto text-xs text-[#1E2922]/70">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#0F261C]">Official Listing:</span>
            <span>Ralli's Esplanade, Chowringhee Pl, Kolkata</span>
          </div>

          <a
            href={RESTAURANT_INFO.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-[#0F261C] hover:text-[#A8833F] transition-colors"
          >
            <span>View All Google Reviews ({RESTAURANT_INFO.googleReviewCount.toLocaleString()})</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#A8833F]" />
          </a>
        </div>

      </div>
    </section>
  );
};
