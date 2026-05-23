import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromRequest } from "@/lib/auth";
import { estimateFareClpKm, haversineKm, isWithinSantiago } from "@/lib/geofence";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  pickupLat: z.number(),
  pickupLng: z.number(),
  dropoffLat: z.number(),
  dropoffLng: z.number()
});

export async function POST(request: NextRequest) {
  try {
    const auth = getAuthFromRequest(request);
    if (auth.role !== "RIDER") {
      return NextResponse.json({ error: "Only riders can request rides" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = schema.parse(body);

    const pickup = { lat: parsed.pickupLat, lng: parsed.pickupLng };
    const dropoff = { lat: parsed.dropoffLat, lng: parsed.dropoffLng };

    if (!isWithinSantiago(pickup) || !isWithinSantiago(dropoff)) {
      return NextResponse.json(
        { error: "Flashy only operates inside Santiago de Chile" },
        { status: 422 }
      );
    }

    const distance = haversineKm(pickup, dropoff);
    const fareEstimate = estimateFareClpKm(distance);

    const ride = await prisma.ride.create({
      data: {
        riderId: auth.userId,
        pickupLat: parsed.pickupLat,
        pickupLng: parsed.pickupLng,
        dropoffLat: parsed.dropoffLat,
        dropoffLng: parsed.dropoffLng,
        fareEstimate,
        status: "REQUESTED"
      }
    });

    return NextResponse.json({ ride });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request", detail: String(error) }, { status: 400 });
  }
}
