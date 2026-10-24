import React from 'react';
import { Star, ShieldCheck, ExternalLink, Award, Users, CheckCircle, Info } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface GoogleRatingSectionProps {
  apiStatus: 'LIVE_VERIFIED' | 'NEEDS_CONFIGURATION' | 'LOADING';
  liveRating?: number;
  liveReviewCount?: number;
}

export const GoogleRatingSection: React.FC<GoogleRatingSectionProps> = ({
  apiStatus,
  liveRating,
  liveReviewCount,
}) => {
  const ratingToDisplay = liveRating ?? RESTAURANT_INFO.googleRating;
  const reviewsToDisplay = liveReviewCount ?? RESTAURANT_INFO.googleReviewCount;
  const isLive = apiStatus === 'LIVE_VERIFIED';

  return (
    <section id="rating" className="py-20 lg:py-24 bg-[#081710] text-[#F7F3EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#D8B26E] font-semibold">
            Google Customer Standing
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F3EA]">
            Google Rating & Community Feedback
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          <p className="mt-4 text-base text-[#EFE8DA]/80 leading-relaxed">
            Consistently appreciated by diners in Chowringhee, Kolkata. Below is the business rating profile provided from our official Google Maps listing.
          </p>
        </div>

        {/* Rating Hero Card */}
        <div className="max-w-4xl mx-auto bg-[#0F261C] border border-[#C5A059]/40 rounded-xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Big 5.0 Score Block */}
            <div className="md:col-span-5 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#D8B26E] font-medium uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                <span>Google Maps Profile</span>
              </div>
              <div className="flex items-baseline justify-center md:justify-start gap-3">
                <span className="font-serif text-6xl sm:text-7xl font-bold text-[#F7F3EA]">
                  {ratingToDisplay.toFixed(1)}
                </span>
                <span className="text-xl text-[#D8B26E] font-medium">/ 5.0</span>
              </div>

              {/* 5 Filled Stars */}
              <div className="flex items-center justify-center md:justify-start gap-1.5 my-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D8B26E] text-[#D8B26E]" />
                ))}
              </div>

              <p className="text-sm font-semibold text-[#F7F3EA]">
                {reviewsToDisplay.toLocaleString()} Verified Customer Reviews
              </p>

              {/* Data Verification Label */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#17382B] border border-[#C5A059]/30 text-xs text-[#D8B26E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D8B26E]" />
                <span>
                  {isLive
                    ? 'Verified Live via Google Places API'
                    : 'Supplied Google Maps Listing Information'}
                </span>
              </div>
            </div>

            {/* Right Side: Rating Context & Verified Link */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#F7F3EA]">
                Authenticity & Community Trust
              </h3>
              <p className="text-xs sm:text-sm text-[#EFE8DA]/85 leading-relaxed">
                Ralli's Esplanade holds a distinguished 5.0-star rating across 1,349 genuine customer submissions on Google Maps. Customers regularly highlight our attentive hospitality, fresh North Indian specialties, savory chaats, and prime accessibility in Chowringhee.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-[#EFE8DA]/90">
                  <CheckCircle className="w-4 h-4 text-[#D8B26E] shrink-0" />
                  <span>Culinary Consistency</span>
                </div>
                <div className="flex items-center gap-2 text-[#EFE8DA]/90">
                  <CheckCircle className="w-4 h-4 text-[#D8B26E] shrink-0" />
                  <span>Central Esplanade Spot</span>
                </div>
                <div className="flex items-center gap-2 text-[#EFE8DA]/90">
                  <CheckCircle className="w-4 h-4 text-[#D8B26E] shrink-0" />
                  <span>Warm, Attentive Staff</span>
                </div>
                <div className="flex items-center gap-2 text-[#EFE8DA]/90">
                  <CheckCircle className="w-4 h-4 text-[#D8B26E] shrink-0" />
                  <span>Dine-In & Takeaway Care</span>
                </div>
              </div>

              {/* Direct Link to Google Maps Listing */}
              <div className="pt-3">
                <a
                  href={RESTAURANT_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#C5A059] text-[#081710] hover:bg-[#D8B26E] text-xs font-bold transition-all shadow-sm"
                >
                  <Users className="w-4 h-4" />
                  <span>Verify on Google Maps Listing</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

          {/* Technical Disclosure Footnote */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-start gap-2.5 text-xs text-[#EFE8DA]/70">
            <Info className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <p>
              <strong>Data Disclosure:</strong> The 5.0 rating and 1,349 review count are displayed directly as supplied from the official Google Maps listing for Ralli's Esplanade (10-D, Jawahar Lal Nehru Road, Chowringhee Pl, Kolkata). When live API credentials are authenticated, statistics sync dynamically with Google's Places servers.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
