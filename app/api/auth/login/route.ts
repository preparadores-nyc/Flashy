import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: parsed.email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(parsed.password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ userId: user.id, role: user.role });
    return NextResponse.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request", detail: String(error) }, { status: 400 });
  }
}
