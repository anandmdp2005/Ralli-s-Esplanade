import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { GoogleRatingSection } from './components/GoogleRatingSection';
import { GoogleReviewsSection, GoogleReviewItem } from './components/GoogleReviewsSection';
import { PhotoGallerySection, GooglePlacePhoto } from './components/PhotoGallerySection';
import { GoogleMapSection } from './components/GoogleMapSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApiConfigModal } from './components/ApiConfigModal';
import { RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  const [apiStatus, setApiStatus] = useState<'LIVE_VERIFIED' | 'NEEDS_CONFIGURATION' | 'LOADING'>('LOADING');
  const [reviews, setReviews] = useState<GoogleReviewItem[]>([]);
  const [photos, setPhotos] = useState<GooglePlacePhoto[]>([]);
  const [liveRating, setLiveRating] = useState<number | undefined>(undefined);
  const [liveReviewCount, setLiveReviewCount] = useState<number | undefined>(undefined);
  const [apiResponseData, setApiResponseData] = useState<any>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Fetch place details from backend proxy
  const fetchPlacesDetails = useCallback(async () => {
    try {
      const res = await fetch('/api/places/details');
      if (!res.ok) {
        setApiStatus('NEEDS_CONFIGURATION');
        return;
      }
      const data = await res.json();
      setApiResponseData(data);

      if (data.status === 'LIVE_VERIFIED' || data.status === 'CACHED') {
        setApiStatus('LIVE_VERIFIED');
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
        if (data.photos && data.photos.length > 0) {
          setPhotos(data.photos);
        }
        if (data.place?.rating) {
          setLiveRating(data.place.rating);
        }
        if (data.place?.reviewCount) {
          setLiveReviewCount(data.place.reviewCount);
        }
      } else {
        setApiStatus('NEEDS_CONFIGURATION');
      }
    } catch (err) {
      console.warn('Backend /api/places/details unavailable or offline:', err);
      setApiStatus('NEEDS_CONFIGURATION');
    }
  }, []);

  useEffect(() => {
    fetchPlacesDetails();
  }, [fetchPlacesDetails]);

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1E2922] flex flex-col font-sans selection:bg-[#C5A059]/25 selection:text-[#0F261C]">
      
      {/* 1. Header & Navigation */}
      <Navbar
        onOpenConfig={() => setIsConfigModalOpen(true)}
        apiStatus={apiStatus}
      />

      <main className="flex-1">
        {/* 2. Homepage Hero Section */}
        <Hero
          onViewMenuClick={handleScrollToMenu}
          apiStatus={apiStatus}
        />

        {/* 3. About Us Section */}
        <AboutSection />

        {/* 4. Food Menu Section */}
        <MenuSection />

        {/* 5. Google Rating Section */}
        <GoogleRatingSection
          apiStatus={apiStatus}
          liveRating={liveRating}
          liveReviewCount={liveReviewCount}
        />

        {/* 6. Google Customer Reviews Section */}
        <GoogleReviewsSection
          reviews={reviews}
          apiStatus={apiStatus}
          onOpenConfig={() => setIsConfigModalOpen(true)}
        />

        {/* 7. Restaurant Photo Gallery Section */}
        <PhotoGallerySection
          photos={photos}
          apiStatus={apiStatus}
          onOpenConfig={() => setIsConfigModalOpen(true)}
        />

        {/* 8. Google Maps & Directions Section */}
        <GoogleMapSection />

        {/* 9. Contact & Reservations Section */}
        <ContactSection />
      </main>

      {/* 10. Footer Section */}
      <Footer
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      {/* Google Maps Platform API Setup & Documentation Drawer */}
      <ApiConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        apiStatus={apiStatus}
        onRefresh={fetchPlacesDetails}
        statusData={apiResponseData}
      />

    </div>
  );
}
