// app/api/geocode/route.ts

import { NextResponse } from 'next/server';

// NOTE: This must be a standard environment variable (NOT NEXT_PUBLIC)
// defined in your .env or environment configuration for server security.
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY; 

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    if (!GOOGLE_MAPS_API_KEY) {
        console.error("GOOGLE_MAPS_API_KEY is not set on the server.");
        return NextResponse.json({ error: 'Server key not configured' }, { status: 500 });
    }

    try {
        // 1. Places Autocomplete (to get Place IDs)
        // Add a sessiontoken for better billing management
        const sessionToken = crypto.randomUUID(); 
        const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}&components=country:in&language=en&sessiontoken=${sessionToken}`;

        const autocompleteResponse = await fetch(autocompleteUrl);
        const autocompleteData = await autocompleteResponse.json();

        if (autocompleteData.status !== 'OK' || !autocompleteData.predictions) {
            // Handle ZERO_RESULTS or other non-critical statuses gracefully
            return NextResponse.json([], { status: 200 }); 
        }

        const results = [];
        
        // 2. Geocoding (to convert Place ID to Coordinates)
        for (const prediction of autocompleteData.predictions.slice(0, 5)) {
            const placeId = prediction.place_id;
            // Re-use session token for the geocoding call
            const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}&sessiontoken=${sessionToken}`;
            
            const geocodingResponse = await fetch(geocodingUrl);
            const geocodingData = await geocodingResponse.json();

            if (geocodingData.status === 'OK' && geocodingData.results && geocodingData.results.length > 0) {
                const location = geocodingData.results[0].geometry.location;
                results.push({
                    label: prediction.description,
                    latitude: location.lat,
                    longitude: location.lng,
                });
            }
        }

        return NextResponse.json(results, { status: 200 });

    } catch (error) {
        console.error('Server Proxy Runtime Error:', error);
        return NextResponse.json({ error: 'Internal Server Error during geocoding' }, { status: 500 });
    }
}