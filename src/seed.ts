import { prisma } from "./db";

const main = async () => {
  const users = await prisma.user.findMany();

  console.log(users);
}

main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
});