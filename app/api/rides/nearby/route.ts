import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromRequest } from "@/lib/auth";
import { haversineKm, isWithinSantiago } from "@/lib/geofence";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  lat: z.number(),
  lng: z.number()
});

export async function POST(request: NextRequest) {
  try {
    const auth = getAuthFromRequest(request);
    if (auth.role !== "DRIVER") {
      return NextResponse.json({ error: "Only drivers can use this endpoint" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = schema.parse(body);

    if (!isWithinSantiago(parsed)) {
      return NextResponse.json({ error: "Driver location must be in Santiago" }, { status: 422 });
    }

    await prisma.user.update({
      where: { id: auth.userId },
      data: {
        currentLat: parsed.lat,
        currentLng: parsed.lng,
        driverStatus: "ONLINE"
      }
    });

    const candidates = await prisma.ride.findMany({
      where: { status: "REQUESTED" },
      orderBy: { requestedAt: "asc" },
      take: 100
    });

    const nearby = candidates
      .map((ride) => {
        const km = haversineKm({ lat: parsed.lat, lng: parsed.lng }, { lat: ride.pickupLat, lng: ride.pickupLng });
        return { ride, distanceKm: km };
      })
      .filter((item) => item.distanceKm <= 6)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 20);

    return NextResponse.json({ nearby });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request", detail: String(error) }, { status: 400 });
  }
}
