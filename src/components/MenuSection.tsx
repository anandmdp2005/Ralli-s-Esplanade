import React, { useState, useMemo } from 'react';
import { Search, Info, Phone, Utensils, Check } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem, RESTAURANT_INFO } from '../data/restaurantData';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#F7F3EA] text-[#1E2922] relative border-t border-[#E3D9C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#A8833F] font-semibold">
            Freshly Prepared Daily
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F261C]">
            Our Dining Menu
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          <p className="mt-4 text-base text-[#1E2922]/80 leading-relaxed">
            Discover our curated selection of North Indian gravies, fragrant biryanis, hot clay-oven breads, and heritage refreshments.
          </p>
        </div>

        {/* Pricing Policy Disclaimer Notice */}
        <div className="mb-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-lg bg-white border border-[#C5A059]/40 shadow-xs">
          <div className="flex items-start gap-3.5">
            <Info className="w-5 h-5 text-[#A8833F] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#1E2922]/85 space-y-1">
              <p className="font-semibold text-[#0F261C]">
                Verified Menu & Transparent Pricing Policy
              </p>
              <p className="leading-relaxed">
                In strict compliance with accuracy standards, we do not invent or fabricate fixed restaurant prices online. Dishes listed reflect authentic selections prepared at Ralli's Esplanade. Daily rates depend on fresh market sourcing. Please ask your server at the table or call us directly at{' '}
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-bold text-[#0F261C] underline">
                  {RESTAURANT_INFO.phone}
                </a>{' '}
                for today's verified menu prices.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Dietary Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#1E2922]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white border border-[#E3D9C4] text-sm text-[#1E2922] placeholder:text-[#1E2922]/40 focus:outline-none focus:border-[#C5A059] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1E2922]/50 hover:text-[#0F261C]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#E3D9C4] rounded-md w-full md:w-auto justify-center">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                dietaryFilter === 'all'
                  ? 'bg-[#0F261C] text-[#F7F3EA]'
                  : 'text-[#1E2922]/70 hover:text-[#0F261C]'
              }`}
            >
              All Dishes
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                dietaryFilter === 'veg'
                  ? 'bg-[#0F261C] text-[#F7F3EA]'
                  : 'text-[#1E2922]/70 hover:text-[#0F261C]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>Pure Veg</span>
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                dietaryFilter === 'non-veg'
                  ? 'bg-[#0F261C] text-[#F7F3EA]'
                  : 'text-[#1E2922]/70 hover:text-[#0F261C]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
              <span>Non-Veg</span>
            </button>
          </div>

        </div>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#C5A059] text-[#081710] shadow-sm'
                    : 'bg-white text-[#1E2922]/75 border border-[#E3D9C4] hover:border-[#C5A059] hover:text-[#0F261C]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-[#E3D9C4] p-8 max-w-lg mx-auto">
            <Utensils className="w-10 h-10 text-[#C5A059] mx-auto mb-3" />
            <p className="font-serif text-lg font-bold text-[#0F261C]">No Dishes Found</p>
            <p className="text-xs text-[#1E2922]/70 mt-1">
              Try adjusting your search criteria or resetting filters to view all menu choices.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#0F261C] text-[#F7F3EA] text-xs font-medium rounded-md hover:bg-[#17382B]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-lg overflow-hidden border border-[#E3D9C4] hover:border-[#C5A059]/60 shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Food Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FBF9F5]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Dietary Marker Icon: Green Box with Green Dot (Veg) / Brown/Red Box with Red Dot (Non-Veg) */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1 rounded-sm border border-black/10 shadow-xs flex items-center justify-center">
                    {item.dietary === 'veg' ? (
                      <div className="w-4 h-4 border border-emerald-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border border-red-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-red-600" />
                      </div>
                    )}
                  </div>

                  {item.isChefSpecial && (
                    <div className="absolute top-3 right-3 bg-[#0F261C]/90 text-[#D8B26E] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm border border-[#C5A059]/40">
                      Signature Pick
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F261C] group-hover:text-[#A8833F] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#1E2922]/75 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing Footer */}
                  <div className="mt-5 pt-3 border-t border-[#E3D9C4]/60 flex items-center justify-between text-xs">
                    <span className="text-[#1E2922]/60 font-medium">Pricing Status</span>
                    <span className="font-semibold text-[#0F261C] text-[11px] bg-[#F7F3EA] px-2 py-1 rounded border border-[#E3D9C4]">
                      {item.priceNote}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Callout */}
        <div className="mt-14 text-center">
          <p className="text-xs text-[#1E2922]/70">
            Catering, bulk orders, and specific dietary requirements are happily accommodated.
          </p>
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-[#0F261C] hover:text-[#A8833F]"
          >
            <Phone className="w-4 h-4 text-[#A8833F]" />
            <span>Call {RESTAURANT_INFO.phone} to inquire about daily specials</span>
          </a>
        </div>

      </div>
    </section>
  );
};
