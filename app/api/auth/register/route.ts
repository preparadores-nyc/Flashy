import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const commonSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["RIDER", "DRIVER"]),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(8),
  countryCode: z.string().min(2),
  nationalId: z.string().min(6),
  dateOfBirth: z.string().datetime(),
  addressLine1: z.string().min(5),
  commune: z.string().min(2),
  city: z.string().min(2)
});

const riderSchema = commonSchema.extend({
  emergencyName: z.string().min(2),
  emergencyPhone: z.string().min(8)
});

const driverSchema = commonSchema.extend({
  licenseNumber: z.string().min(5),
  licenseExpiry: z.string().datetime(),
  vehicleMake: z.string().min(2),
  vehicleModel: z.string().min(1),
  vehicleYear: z.number().int().min(1990).max(2100),
  vehicleColor: z.string().min(2),
  vehiclePlate: z.string().min(5),
  insurancePolicy: z.string().min(5)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed =
      body.role === "DRIVER" ? driverSchema.parse(body) : riderSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: parsed.email.toLowerCase() }
    });

    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(parsed.password, 10);
    const user = await prisma.user.create({
      data: {
        email: parsed.email.toLowerCase(),
        passwordHash,
        role: parsed.role,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        phone: parsed.phone,
        countryCode: parsed.countryCode,
        nationalId: parsed.nationalId,
        dateOfBirth: new Date(parsed.dateOfBirth),
        addressLine1: parsed.addressLine1,
        commune: parsed.commune,
        city: parsed.city,
        emergencyName: "emergencyName" in parsed ? parsed.emergencyName : null,
        emergencyPhone: "emergencyPhone" in parsed ? parsed.emergencyPhone : null,
        licenseNumber: "licenseNumber" in parsed ? parsed.licenseNumber : null,
        licenseExpiry: "licenseExpiry" in parsed ? new Date(parsed.licenseExpiry) : null,
        vehicleMake: "vehicleMake" in parsed ? parsed.vehicleMake : null,
        vehicleModel: "vehicleModel" in parsed ? parsed.vehicleModel : null,
        vehicleYear: "vehicleYear" in parsed ? parsed.vehicleYear : null,
        vehicleColor: "vehicleColor" in parsed ? parsed.vehicleColor : null,
        vehiclePlate: "vehiclePlate" in parsed ? parsed.vehiclePlate : null,
        insurancePolicy: "insurancePolicy" in parsed ? parsed.insurancePolicy : null,
        driverStatus: parsed.role === "DRIVER" ? "OFFLINE" : undefined
      }
    });

    const token = signToken({ userId: user.id, role: user.role });
    return NextResponse.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request", detail: String(error) }, { status: 400 });
  }
}
