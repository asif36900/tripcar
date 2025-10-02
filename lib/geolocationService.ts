// src/services/geolocationService.ts

// IMPORTANT: Replace with your actual environment variable names and keys.
const OPENROUTESERVICE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTESERVICE_KEY; 
const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY; 
// Nominatim is public and does not require a key, but is rate-limited (max 1 request/sec).

export interface AddressSuggestion {
    label: string;
    latitude: number;
    longitude: number;
}

/**
 * Utility to fetch geocoding suggestions from OpenRouteService (ORS). (Primary)
 */
const fetchORS = async (query: string): Promise<AddressSuggestion[]> => {
    if (!query || !OPENROUTESERVICE_API_KEY) {
        throw new Error("ORS API key is missing or query is empty.");
    }
    
    // ORS uses the 'pelias' API format for geocoding
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${OPENROUTESERVICE_API_KEY}&text=${encodeURIComponent(query)}&size=5&layers=address,street,locality`;

    const response = await fetch(url);
    if (!response.ok) {
        // Throwing an error here triggers the fallback logic
        throw new Error(`ORS API failed with status: ${response.status}`);
    }
    const data = await response.json();
    
    return data.features.map((feature: any) => ({
        label: feature.properties.label || feature.properties.name,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
    }));
};

/**
 * Utility to fetch geocoding suggestions from Geoapify (Secondary Fallback).
 */
const fetchGeoapify = async (query: string): Promise<AddressSuggestion[]> => {
    if (!query || !GEOAPIFY_API_KEY) {
        throw new Error("Geoapify API key is missing or query is empty.");
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${GEOAPIFY_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Geoapify API failed with status: ${response.status}`);
    }
    const data = await response.json();

    return data.features.map((feature: any) => ({
        label: feature.properties.formatted,
        latitude: feature.properties.lat,
        longitude: feature.properties.lon,
    }));
};

/**
 * Utility to fetch geocoding suggestions from Nominatim (Final Fallback).
 * No API key is required.
 */
const fetchNominatim = async (query: string): Promise<AddressSuggestion[]> => {
    if (!query) {
        throw new Error("Nominatim query is empty.");
    }
    
    // Using the public Nominatim service. Ensure client respects rate limits (max 1 request/sec).
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=0`;
    
    const response = await fetch(url, {
        headers: {
            // It's recommended to send a unique User-Agent to identify your application
            'User-Agent': 'BookingApp/1.0 (contact@example.com)'
        }
    });
    
    if (!response.ok) {
        throw new Error(`Nominatim API failed with status: ${response.status}`);
    }
    const data = await response.json();

    return data.map((item: any) => ({
        label: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
    }));
};


/**
 * Fetches address suggestions using ORS (Primary), Geoapify (Fallback 1), and Nominatim (Fallback 2).
 */
export const fetchAddressSuggestions = async (query: string): Promise<AddressSuggestion[]> => {
    if (!query || query.length < 3) return [];

    try {
        // 1. Try Primary API: OpenRouteService
        const orsResults = await fetchORS(query);
        return orsResults;
    } catch (orsError) {
        console.warn('Primary Geocoding (ORS) failed. Falling back to Geoapify.');
        try {
            // 2. Try Fallback API 1: Geoapify
            const geoapifyResults = await fetchGeoapify(query);
            return geoapifyResults;
        } catch (geoapifyError) {
            console.warn('Fallback 1 (Geoapify) failed. Falling back to Nominatim.');
             try {
                // 3. Try Fallback API 2: Nominatim (No Key Required)
                const nominatimResults = await fetchNominatim(query);
                return nominatimResults;
            } catch (nominatimError) {
                console.error('All three geocoding APIs failed to return suggestions.', nominatimError);
                return []; // Return empty array if all fail
            }
        }
    }
};