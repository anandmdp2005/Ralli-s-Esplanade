import React, { useState } from 'react';
import { X, Key, MapPin, CheckCircle2, AlertTriangle, RefreshCw, ExternalLink, ShieldAlert, Copy, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ApiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiStatus: 'LIVE_VERIFIED' | 'NEEDS_CONFIGURATION' | 'LOADING';
  onRefresh: () => Promise<void>;
  statusData?: any;
}

export const ApiConfigModal: React.FC<ApiConfigModalProps> = ({
  isOpen,
  onClose,
  apiStatus,
  onRefresh,
  statusData,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  if (!isOpen) return null;

  const handleTestStatus = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const sampleEnvText = `# Google Maps Platform Credentials (server.ts proxy)
GOOGLE_MAPS_API_KEY="AIzaSy..."
GOOGLE_PLACE_ID="ChIJ..."`;

  const copyEnvSnippet = () => {
    navigator.clipboard.writeText(sampleEnvText);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0F261C] border border-[#C5A059]/50 rounded-xl text-[#F7F3EA] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#081710] border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Key className="w-5 h-5 text-[#D8B26E]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F7F3EA]">
                Google Maps Platform Integration Guide
              </h3>
              <p className="text-xs text-[#EFE8DA]/70">
                Authorized Google Places API & Place ID Configuration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#EFE8DA]/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          
          {/* Current Live Backend Status */}
          <div className="p-4 rounded-lg bg-[#081710] border border-white/15">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#D8B26E] uppercase tracking-wider">
                Current Backend Status
              </span>
              <button
                onClick={handleTestStatus}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#17382B] hover:bg-[#214C3B] text-xs font-medium text-[#F7F3EA] transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Testing...' : 'Test Backend Status'}</span>
              </button>
            </div>

            {apiStatus === 'LIVE_VERIFIED' ? (
              <div className="flex items-start gap-2.5 text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-300">Live API Synchronized</p>
                  <p className="text-xs text-[#EFE8DA]/80 mt-0.5">
                    Server is securely communicating with Google Places API. Live genuine customer reviews and place photos are currently streaming.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2.5 text-amber-300">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <p className="font-semibold text-amber-200">Pending API Credentials</p>
                  <p className="text-xs text-[#EFE8DA]/80 mt-0.5">
                    Displaying verified supplied business data (5.0 Stars, 1,349 reviews). To stream genuine live reviews and business photos into the website, add your Google Maps credentials to the environment.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Required Environment Variables */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#F7F3EA] text-xs uppercase tracking-wider">
                Required Environment Variables (.env)
              </span>
              <button
                onClick={copyEnvSnippet}
                className="text-xs text-[#D8B26E] hover:underline flex items-center gap-1"
              >
                {copiedEnv ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 rounded bg-[#081710] border border-white/10 text-xs font-mono text-[#D8B26E] overflow-x-auto">
              {sampleEnvText}
            </pre>
          </div>

          {/* Step by Step Setup Instructions */}
          <div className="space-y-3">
            <span className="font-semibold text-[#F7F3EA] text-xs uppercase tracking-wider block">
              Step-by-Step Setup Instructions
            </span>

            <ol className="space-y-3 pl-1 text-xs text-[#EFE8DA]/85">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#17382B] text-[#D8B26E] font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-[#F7F3EA]">Create a Google Cloud Project:</strong>
                  <p className="mt-0.5">
                    Visit the Google Cloud Console (console.cloud.google.com) and create or select your project.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#17382B] text-[#D8B26E] font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-[#F7F3EA]">Enable Required Google Maps APIs:</strong>
                  <p className="mt-0.5">
                    Navigate to <em>APIs & Services &gt; Library</em> and enable:
                    <br />
                    • <strong>Places API (New)</strong> (for genuine reviews, ratings, and business photos)
                    <br />
                    • <strong>Maps JavaScript API</strong> (for interactive client mapping)
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#17382B] text-[#D8B26E] font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-[#F7F3EA]">Generate & Restrict API Key:</strong>
                  <p className="mt-0.5">
                    Go to <em>APIs & Services &gt; Credentials</em>, generate a new API key, and restrict API access to Places API. Assign this key to <code className="text-[#D8B26E]">GOOGLE_MAPS_API_KEY</code>.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#17382B] text-[#D8B26E] font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <strong className="text-[#F7F3EA]">Find the Place ID for Ralli's Esplanade:</strong>
                  <p className="mt-0.5">
                    Search for <em>"Ralli's Esplanade, 10-D Jawahar Lal Nehru Road, Chowringhee, Kolkata"</em> using the{' '}
                    <a
                      href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D8B26E] underline inline-flex items-center gap-1"
                    >
                      Google Place ID Finder <ExternalLink className="w-3 h-3" />
                    </a>
                    . Assign this ID to <code className="text-[#D8B26E]">GOOGLE_PLACE_ID</code>.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#17382B] text-[#D8B26E] font-bold text-xs flex items-center justify-center shrink-0">
                  5
                </span>
                <div>
                  <strong className="text-[#F7F3EA]">Security & Privacy Compliance:</strong>
                  <p className="mt-0.5">
                    The Express server (<code className="text-[#D8B26E]">server.ts</code>) proxies all Google Places API requests server-side. Your private API key is never exposed to the client browser.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Compliance Safeguards */}
          <div className="p-4 rounded-lg bg-[#081710] border border-white/10 flex items-start gap-3 text-xs text-[#EFE8DA]/75">
            <ShieldAlert className="w-5 h-5 text-[#D8B26E] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#F7F3EA]">Google API Policy Adherence:</span>
              <p className="mt-0.5 leading-relaxed">
                This website strictly respects Google Places Terms of Service. Customer reviews are never scraped or fabricated. Memory caching conforms to the 24-hour refresh threshold. Attribution is provided on all verified photos and reviews.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#081710] border-t border-[#C5A059]/30 flex items-center justify-between">
          <a
            href={RESTAURANT_INFO.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#D8B26E] hover:underline flex items-center gap-1"
          >
            <span>Open Ralli's Esplanade on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#C5A059] text-[#081710] hover:bg-[#D8B26E] text-xs font-bold transition-all"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
