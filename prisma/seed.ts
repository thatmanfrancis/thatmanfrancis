import "dotenv/config";
import { runDatabaseSeed } from "../lib/seed";
import { prisma } from "../lib/prisma";

async function main() {
  const result = await runDatabaseSeed();
  const createdProjects = result.projects.filter((p) => p.created).length;
  const createdPosts = result.posts.filter((p) => p.created).length;
  console.log(
    `Seeded admin ${result.adminEmail}` +
      `${result.settingsCreated ? ", settings" : ""}` +
      `, projects +${createdProjects}, posts +${createdPosts}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
