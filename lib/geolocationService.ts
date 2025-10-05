// // src/services/geolocationService.ts

// // IMPORTANT: Replace with your actual environment variable names and keys.
// // Google Maps API Key will be the new primary key.
// const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
// const OPENROUTESERVICE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTESERVICE_KEY;
// const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;
// // Nominatim is public and does not require a key.

// export interface AddressSuggestion {
//     label: string;
//     latitude: number;
//     longitude: number;
// }

// /**
//  * Utility to fetch geocoding suggestions from Google Maps Places Autocomplete (Primary).
//  */
// const fetchGoogleMaps = async (query: string): Promise<AddressSuggestion[]> => {
//     if (!query || !GOOGLE_MAPS_API_KEY) {
//         // Only throw an error if the key is present but the API call fails.
//         // If key is missing, we'll let the main function fall back gracefully.
//         throw new Error("Google Maps API key is missing or query is empty.");
//     }

//     // 1. Use Places Autocomplete to get Place IDs
//     const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}&components=country:in&language=en&sessiontoken=${crypto.randomUUID()}`;

//     const autocompleteResponse = await fetch(autocompleteUrl);
//     if (!autocompleteResponse.ok) {
//         throw new Error(`Google Maps Autocomplete failed with status: ${autocompleteResponse.status}`);
//     }
//     const autocompleteData = await autocompleteResponse.json();

//     if (!autocompleteData.predictions || autocompleteData.predictions.length === 0) {
//         return [];
//     }

//     // 2. Use Geocoding API to convert Place ID to Coordinates (Sequential for simplicity, parallel for perf in real app)
//     const results: AddressSuggestion[] = [];
//     
//     for (const prediction of autocompleteData.predictions.slice(0, 5)) {
//         const placeId = prediction.place_id;
//         const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`;
//         
//         const geocodingResponse = await fetch(geocodingUrl);
//         const geocodingData = await geocodingResponse.json();

//         if (geocodingData.results && geocodingData.results.length > 0) {
//             const location = geocodingData.results[0].geometry.location;
//             results.push({
//                 label: prediction.description,
//                 latitude: location.lat,
//                 longitude: location.lng,
//             });
//         }
//     }

//     return results;
// };

// /**
//  * Utility to fetch geocoding suggestions from OpenRouteService (Fallback 1).
//  */
// const fetchORS = async (query: string): Promise<AddressSuggestion[]> => {
//     if (!query || !OPENROUTESERVICE_API_KEY) {
//         throw new Error("ORS API key is missing or query is empty.");
//     }
//     
//     // ORS uses the 'pelias' API format for geocoding
//     const url = `https://api.openrouteservice.org/geocode/search?api_key=${OPENROUTESERVICE_API_KEY}&text=${encodeURIComponent(query)}&size=5&layers=address,street,locality`;

//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`ORS API failed with status: ${response.status}`);
//     }
//     const data = await response.json();
//     
//     return data.features.map((feature: any) => ({
//         label: feature.properties.label || feature.properties.name,
//         latitude: feature.geometry.coordinates[1],
//         longitude: feature.geometry.coordinates[0],
//     }));
// };

// /**
//  * Utility to fetch geocoding suggestions from Geoapify (Fallback 2).
//  */
// const fetchGeoapify = async (query: string): Promise<AddressSuggestion[]> => {
//     if (!query || !GEOAPIFY_API_KEY) {
//         throw new Error("Geoapify API key is missing or query is empty.");
//     }

//     const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${GEOAPIFY_API_KEY}`;
//     
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`Geoapify API failed with status: ${response.status}`);
//     }
//     const data = await response.json();

//     return data.features.map((feature: any) => ({
//         label: feature.properties.formatted,
//         latitude: feature.properties.lat,
//         longitude: feature.properties.lon,
//     }));
// };

// /**
//  * Utility to fetch geocoding suggestions from Nominatim (Final Fallback 3).
//  * No API key is required.
//  */
// const fetchNominatim = async (query: string): Promise<AddressSuggestion[]> => {
//     if (!query) {
//         throw new Error("Nominatim query is empty.");
//     }
//     
//     // Using the public Nominatim service. Ensure client respects rate limits (max 1 request/sec).
//     const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=0`;
//     
//     const response = await fetch(url, {
//         headers: {
//             // It's recommended to send a unique User-Agent to identify your application
//             'User-Agent': 'BookingApp/1.0 (contact@example.com)'
//         }
//     });
//     
//     if (!response.ok) {
//         throw new Error(`Nominatim API failed with status: ${response.status}`);
//     }
//     const data = await response.json();

//     return data.map((item: any) => ({
//         label: item.display_name,
//         latitude: parseFloat(item.lat),
//         longitude: parseFloat(item.lon),
//     }));
// };


// /**
//  * Fetches address suggestions using a robust primary/fallback chain:
//  * 1. Google Maps (Primary)
//  * 2. OpenRouteService (Fallback 1)
//  * 3. Geoapify (Fallback 2)
//  * 4. Nominatim (Final Fallback 3)
//  */
// export const fetchAddressSuggestions = async (query: string): Promise<AddressSuggestion[]> => {
//     if (!query || query.length < 3) return [];

//     try {
//         // 1. Try Primary API: Google Maps
//         if (GOOGLE_MAPS_API_KEY) {
//             const googleResults = await fetchGoogleMaps(query);
//             if (googleResults.length > 0) return googleResults;
//         }
//         throw new Error("Google Maps failed or key missing.");
//         
//     } catch (googleError) {
//         console.warn('Primary Geocoding (Google Maps) failed. Falling back to ORS.');
//         try {
//             // 2. Try Fallback API 1: OpenRouteService
//             if (OPENROUTESERVICE_API_KEY) {
//                 const orsResults = await fetchORS(query);
//                 return orsResults;
//             }
//             throw new Error("ORS failed or key missing.");
//         } catch (orsError) {
//             console.warn('Fallback 1 (ORS) failed. Falling back to Geoapify.');
//             try {
//                 // 3. Try Fallback API 2: Geoapify
//                 if (GEOAPIFY_API_KEY) {
//                     const geoapifyResults = await fetchGeoapify(query);
//                     return geoapifyResults;
//                 }
//                 throw new Error("Geoapify failed or key missing.");
//             } catch (geoapifyError) {
//                 console.warn('Fallback 2 (Geoapify) failed. Falling back to Nominatim.');
//                 try {
//                     // 4. Try Final Fallback: Nominatim (No Key Required)
//                     const nominatimResults = await fetchNominatim(query);
//                     return nominatimResults;
//                 } catch (nominatimError) {
//                     console.error('All geocoding APIs failed to return suggestions.', nominatimError);
//                     return []; // Return empty array if all fail
//                 }
//             }
//         }
//     }
// };



// src/services/geolocationService.ts
// src/services/geolocationService.ts

export interface AddressSuggestion {
    label: string;
    latitude: number;
    longitude: number;
}

/**
 * Fetches address suggestions by securely calling the local server-side proxy.
 */
export const fetchAddressSuggestions = async (query: string): Promise<AddressSuggestion[]> => {
    if (!query || query.length < 3) return [];
    
    try {
        // Call your secure Next.js API Route
        const response = await fetch(`/api/geocode?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            // Log the error from the server if possible
            const errorText = await response.text();
            console.error(`Local geocoding proxy failed with status ${response.status}: ${errorText}`);
            throw new Error(`Server proxy failed.`);
        }

        // The server returns the cleaned AddressSuggestion[] array
        const data = await response.json();
        return data as AddressSuggestion[];
        
    } catch (error) {
        console.error('Error fetching suggestions via proxy:', error);
        return [];
    }
};