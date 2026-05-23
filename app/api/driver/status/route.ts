import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  online: z.boolean()
});

export async function PATCH(request: NextRequest) {
  try {
    const auth = getAuthFromRequest(request);
    if (auth.role !== "DRIVER") {
      return NextResponse.json({ error: "Only drivers can update availability" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = schema.parse(body);

    const user = await prisma.user.update({
      where: { id: auth.userId },
      data: { driverStatus: parsed.online ? "ONLINE" : "OFFLINE" }
    });

    return NextResponse.json({
      user: { id: user.id, driverStatus: user.driverStatus }
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request", detail: String(error) }, { status: 400 });
  }
}
