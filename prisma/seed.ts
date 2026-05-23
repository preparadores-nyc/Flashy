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
      role: "ADMIN"
    }
  });

  await prisma.user.upsert({
    where: { email: "rider@flashy.cl" },
    update: {},
    create: {
      email: "rider@flashy.cl",
      passwordHash,
      role: "RIDER"
    }
  });

  await prisma.user.upsert({
    where: { email: "driver@flashy.cl" },
    update: {},
    create: {
      email: "driver@flashy.cl",
      passwordHash,
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
