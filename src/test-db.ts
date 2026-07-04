import "./config/loadEnv";

import { prisma } from "./infrastructure/database/prisma";

async function main() {
  const events = await prisma.event.findMany();

  console.log(events);

  await prisma.$disconnect();
}

void main();