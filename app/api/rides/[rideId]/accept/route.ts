import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ rideId: string }> }
) {
  try {
    const auth = getAuthFromRequest(request);
    if (auth.role !== "DRIVER") {
      return NextResponse.json({ error: "Only drivers can accept rides" }, { status: 403 });
    }

    const { rideId } = await params;

    const ride = await prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    if (ride.status !== "REQUESTED") {
      return NextResponse.json({ error: "Ride is not available" }, { status: 409 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const lockedRide = await tx.ride.findUnique({ where: { id: rideId } });
      if (!lockedRide || lockedRide.status !== "REQUESTED") {
        throw new Error("Ride no longer available");
      }

      await tx.user.update({
        where: { id: auth.userId },
        data: { driverStatus: "BUSY" }
      });

      return tx.ride.update({
        where: { id: rideId },
        data: {
          driverId: auth.userId,
          status: "ACCEPTED",
          acceptedAt: new Date()
        }
      });
    });

    return NextResponse.json({ ride: updated });
  } catch (error) {
    return NextResponse.json({ error: "Could not accept ride", detail: String(error) }, { status: 400 });
  }
}
