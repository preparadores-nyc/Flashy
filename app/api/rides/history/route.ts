import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const auth = getAuthFromRequest(request);

    if (auth.role === "RIDER") {
      const rides = await prisma.ride.findMany({
        where: { riderId: auth.userId },
        orderBy: { createdAt: "desc" },
        take: 100
      });
      return NextResponse.json({ rides });
    }

    if (auth.role === "DRIVER") {
      const rides = await prisma.ride.findMany({
        where: { driverId: auth.userId },
        orderBy: { createdAt: "desc" },
        take: 100
      });
      return NextResponse.json({ rides });
    }

    const rides = await prisma.ride.findMany({
      orderBy: { createdAt: "desc" },
      take: 200
    });

    return NextResponse.json({ rides });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized", detail: String(error) }, { status: 401 });
  }
}
