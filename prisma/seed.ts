import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Flashy1234", 10);

  await prisma.user.upsert({
    where: { email: "admin@flashy.cl" },
    update: {},
    create: {
      email: "admin@flashy.cl",
      passwordHash,
      firstName: "Admin",
      lastName: "Flashy",
      phone: "+56911111111",
      countryCode: "+56",
      nationalId: "11111111-1",
      dateOfBirth: new Date("1990-01-01T00:00:00.000Z"),
      addressLine1: "Av. Providencia 100",
      commune: "Providencia",
      city: "Santiago",
      role: "ADMIN"
    }
  });

  await prisma.user.upsert({
    where: { email: "rider@flashy.cl" },
    update: {},
    create: {
      email: "rider@flashy.cl",
      passwordHash,
      firstName: "Rider",
      lastName: "Demo",
      phone: "+56922222222",
      countryCode: "+56",
      nationalId: "22222222-2",
      dateOfBirth: new Date("1994-03-11T00:00:00.000Z"),
      addressLine1: "Av. Apoquindo 1234",
      commune: "Las Condes",
      city: "Santiago",
      emergencyName: "Paula Demo",
      emergencyPhone: "+56933333333",
      role: "RIDER"
    }
  });

  await prisma.user.upsert({
    where: { email: "driver@flashy.cl" },
    update: {},
    create: {
      email: "driver@flashy.cl",
      passwordHash,
      firstName: "Driver",
      lastName: "Demo",
      phone: "+56944444444",
      countryCode: "+56",
      nationalId: "33333333-3",
      dateOfBirth: new Date("1988-08-20T00:00:00.000Z"),
      addressLine1: "Av. Vicuña Mackenna 220",
      commune: "Nunoa",
      city: "Santiago",
      licenseNumber: "LIC-CL-9981",
      licenseExpiry: new Date("2030-09-01T00:00:00.000Z"),
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      vehicleYear: 2022,
      vehicleColor: "Negro",
      vehiclePlate: "KLPT27",
      insurancePolicy: "POL-875521",
      role: "DRIVER",
      driverStatus: "ONLINE",
      currentLat: -33.4489,
      currentLng: -70.6693
    }
  });

  console.log("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
