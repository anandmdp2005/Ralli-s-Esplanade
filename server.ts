import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory cache for Google Places data (strictly complies with Google caching policies)
let placesCache: {
  timestamp: number;
  data: any;
} | null = null;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours max cache per Google Places ToS

// In-memory table reservation/inquiry submissions
interface TableInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
  submittedAt: string;
}
const inquiries: TableInquiry[] = [];

// Base verified restaurant profile provided
const SUPPLIED_BUSINESS_DATA = {
  name: "Ralli's Esplanade",
  category: "Restaurant",
  phone: "09831222607",
  formattedPhone: "+91 98312 22607",
  address: "10-D, Jawahar Lal Nehru Road, Chowringhee Pl, Kolkata, West Bengal 700013",
  googleMapsLink: "https://maps.app.goo.gl/5pbVMNEYUzhKXDxr7",
  rating: 5.0,
  reviewCount: 1349,
  landmark: "Chowringhee Place, opposite Esplanade Metro Station",
  city: "Kolkata",
  state: "West Bengal",
  postalCode: "700013",
  country: "India",
  coordinates: {
    lat: 22.5626,
    lng: 88.3510,
  },
  openingHoursNotice: "Open Daily: 11:00 AM – 11:00 PM (Verified restaurant hours. Call ahead for holiday or festival timings).",
};

/**
 * GET /api/places/details
 * Retrieves live details from Google Places API if GOOGLE_MAPS_API_KEY is configured.
 * Securely proxies server-side so API keys are never exposed in browser client.
 */
app.get('/api/places/details', async (_req: Request, res: Response) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Check if credentials are supplied
  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY' || !placeId || placeId === 'ChIJ...') {
    return res.json({
      configured: false,
      status: 'NEEDS_CONFIGURATION',
      message: 'Google Places API credentials (GOOGLE_MAPS_API_KEY and GOOGLE_PLACE_ID) are not configured in environment. Displaying verified business information supplied by the verified Google Maps listing.',
      requiredEnvVars: ['GOOGLE_MAPS_API_KEY', 'GOOGLE_PLACE_ID'],
      place: {
        ...SUPPLIED_BUSINESS_DATA,
        isSuppliedData: true,
      },
      reviews: [],
      photos: [],
      instructions: {
        title: "How to Enable Live Google Places API Integration",
        steps: [
          "Create a Google Cloud Project and generate a restricted Google Maps Platform API Key.",
          "Enable the 'Places API (New)' and 'Maps JavaScript API' in Google Cloud Console.",
          "Locate Ralli's Esplanade Place ID using the Google Place ID Finder tool or Places API text search.",
          "Add GOOGLE_MAPS_API_KEY and GOOGLE_PLACE_ID to your server environment or .env file.",
          "Restart the server to fetch genuine live customer reviews and verified place photos with Google attribution."
        ]
      }
    });
  }

  // Check cache
  if (placesCache && Date.now() - placesCache.timestamp < CACHE_TTL_MS) {
    return res.json({
      configured: true,
      status: 'CACHED',
      cachedAt: new Date(placesCache.timestamp).toISOString(),
      ...placesCache.data,
    });
  }

  try {
    // Attempt Google Places API (New) Place Details fetch
    // Field mask includes displayName, formattedAddress, rating, userRatingCount, reviews, photos, regularOpeningHours
    const placesUrl = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?fields=displayName,formattedAddress,rating,userRatingCount,reviews,photos,regularOpeningHours,internationalPhoneNumber,googleMapsUri`;
    
    const response = await fetch(placesUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,formattedAddress,rating,userRatingCount,reviews,photos,regularOpeningHours,internationalPhoneNumber,googleMapsUri'
      }
    });

    if (!response.ok) {
      // If Places API (New) returns an error, fallback to legacy Places API or report error
      const errorText = await response.text();
      console.warn('Google Places API request returned non-OK status:', response.status, errorText);

      return res.status(200).json({
        configured: true,
        status: 'API_ERROR_FALLBACK',
        errorMessage: `Google Places API returned HTTP ${response.status}. Using verified business details.`,
        place: {
          ...SUPPLIED_BUSINESS_DATA,
          isSuppliedData: true,
        },
        reviews: [],
        photos: [],
      });
    }

    const data = await response.json();

    // Map Google Places reviews to clean, safe structure complying with Google ToS
    const formattedReviews = (data.reviews || []).slice(0, 8).map((rev: any, idx: number) => ({
      id: `rev-${idx}-${rev.publishTime || Date.now()}`,
      authorName: rev.authorAttribution?.displayName || 'Google Customer',
      authorPhotoUrl: rev.authorAttribution?.photoUri || null,
      authorUri: rev.authorAttribution?.uri || SUPPLIED_BUSINESS_DATA.googleMapsLink,
      rating: rev.rating || 5,
      relativePublishTimeDescription: rev.relativePublishTimeDescription || 'Recent review',
      originalText: rev.originalText?.text || rev.text?.text || '',
      publishTime: rev.publishTime || null,
    }));

    // Map Google Places photos metadata (serving via backend proxy)
    const formattedPhotos = (data.photos || []).slice(0, 8).map((p: any) => ({
      name: p.name,
      widthPx: p.widthPx,
      heightPx: p.heightPx,
      authorAttributions: p.authorAttributions || [],
      proxyUrl: `/api/places/photo?name=${encodeURIComponent(p.name)}`,
    }));

    const result = {
      place: {
        name: data.displayName?.text || SUPPLIED_BUSINESS_DATA.name,
        address: data.formattedAddress || SUPPLIED_BUSINESS_DATA.address,
        rating: data.rating ?? SUPPLIED_BUSINESS_DATA.rating,
        reviewCount: data.userRatingCount ?? SUPPLIED_BUSINESS_DATA.reviewCount,
        phone: data.internationalPhoneNumber || SUPPLIED_BUSINESS_DATA.formattedPhone,
        googleMapsUri: data.googleMapsUri || SUPPLIED_BUSINESS_DATA.googleMapsLink,
        openingHours: data.regularOpeningHours?.weekdayDescriptions || null,
        isSuppliedData: false,
      },
      reviews: formattedReviews,
      photos: formattedPhotos,
    };

    placesCache = {
      timestamp: Date.now(),
      data: result,
    };

    return res.json({
      configured: true,
      status: 'LIVE_VERIFIED',
      ...result,
    });
  } catch (err: any) {
    console.error('Error fetching Google Places API details:', err);
    return res.status(200).json({
      configured: true,
      status: 'FETCH_FAILED_FALLBACK',
      message: err.message || 'Network error communicating with Google Places API',
      place: {
        ...SUPPLIED_BUSINESS_DATA,
        isSuppliedData: true,
      },
      reviews: [],
      photos: [],
    });
  }
});

/**
 * GET /api/places/photo
 * Securely proxies Google Place photos so Google API keys are not exposed to the browser.
 */
app.get('/api/places/photo', async (req: Request, res: Response) => {
  const photoName = req.query.name as string;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!photoName || !apiKey) {
    return res.status(400).send('Missing photo name or API key');
  }

  try {
    const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=800&maxWidthPx=1200&key=${apiKey}`;
    const response = await fetch(photoUrl);

    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch photo from Google Places API');
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours caching

    const arrayBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    console.error('Failed to proxy place photo:', err);
    return res.status(500).send('Internal server error loading place photo');
  }
});

/**
 * POST /api/table-inquiry
 * Records a customer dining inquiry or table reservation request.
 */
app.post('/api/table-inquiry', (req: Request, res: Response) => {
  const { name, phone, email, guests, date, time, notes } = req.body;

  if (!name || !phone || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone number, date, and preferred dining time are required.'
    });
  }

  const newInquiry: TableInquiry = {
    id: `INQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: email ? String(email).trim() : undefined,
    guests: Number(guests) || 2,
    date: String(date),
    time: String(time),
    notes: notes ? String(notes).trim() : undefined,
    submittedAt: new Date().toISOString()
  };

  inquiries.unshift(newInquiry);

  return res.status(201).json({
    success: true,
    message: 'Your table inquiry has been received! Our team at Ralli\'s Esplanade will contact you shortly to confirm.',
    inquiry: newInquiry
  });
});

/**
 * GET /api/business-info
 * Returns static verified business data for instant loading
 */
app.get('/api/business-info', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: SUPPLIED_BUSINESS_DATA
  });
});

/**
 * Dev vs Production Server Setup
 */
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Ralli's Esplanade] Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
