// app/api/distance/route.ts
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pickup = searchParams.get("pickup");
    const destination = searchParams.get("destination");

    if (!pickup || !destination) {
      return new Response(
        JSON.stringify({ error: "Missing pickup or destination" }),
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Google Maps API key not configured" }),
        { status: 500 }
      );
    }

    const googleUrl = new URL(
      "https://maps.googleapis.com/maps/api/distancematrix/json"
    );
    googleUrl.searchParams.append("origins", pickup);
    googleUrl.searchParams.append("destinations", destination);
    googleUrl.searchParams.append("key", apiKey);

    const response = await fetch(googleUrl.toString());
    const data = await response.json();

    if (data.status !== "OK") {
      console.error("Google API Status Error:", data.error_message || data.status);
      return new Response(
        JSON.stringify({
          error: data.error_message || "Distance calculation failed",
        }),
        { status: 500 }
      );
    }

    const element = data.rows?.[0]?.elements?.[0];
    if (!element || element.status !== "OK") {
      return new Response(
        JSON.stringify({ error: "Invalid route or location" }),
        { status: 400 }
      );
    }

    const distanceInMeters = element.distance.value;
    const distanceKm = (distanceInMeters / 1000).toFixed(2);

    return new Response(
      JSON.stringify({
        pickup,
        destination,
        distanceKm,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Server API Route Crash:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
