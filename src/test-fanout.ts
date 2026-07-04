import "./config/loadEnv";

import { dependencies } from "./bootstrap/dependencies";

async function main() {
  const result =
    await dependencies.fanoutService.processPendingEvents();

  console.log(result);

  await dependencies.prisma.$disconnect();
}

void main();