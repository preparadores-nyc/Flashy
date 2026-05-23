import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  status: z.enum(["ARRIVED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
});

type Params = {
  params: {
    rideId: string;
  };
};

const transitions: Record<string, string[]> = {
  ACCEPTED: ["ARRIVED", "CANCELLED"],
  ARRIVED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"]
};

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const auth = getAuthFromRequest(request);
    if (auth.role !== "DRIVER") {
      return NextResponse.json({ error: "Only drivers can update ride status" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = schema.parse(body);

    const ride = await prisma.ride.findUnique({ where: { id: params.rideId } });
    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    if (ride.driverId !== auth.userId) {
      return NextResponse.json({ error: "Ride is assigned to another driver" }, { status: 403 });
    }

    const validTargets = transitions[ride.status] || [];
    if (!validTargets.includes(parsed.status)) {
      return NextResponse.json({ error: `Invalid status transition from ${ride.status} to ${parsed.status}` }, { status: 422 });
    }

    const updated = await prisma.ride.update({
      where: { id: params.rideId },
      data: {
        status: parsed.status,
        startedAt: parsed.status === "IN_PROGRESS" ? new Date() : ride.startedAt,
        completedAt: parsed.status === "COMPLETED" ? new Date() : ride.completedAt
      }
    });

    if (parsed.status === "COMPLETED" || parsed.status === "CANCELLED") {
      await prisma.user.update({
        where: { id: auth.userId },
        data: { driverStatus: "ONLINE" }
      });
    }

    return NextResponse.json({ ride: updated });
  } catch (error) {
    return NextResponse.json({ error: "Could not update status", detail: String(error) }, { status: 400 });
  }
}
