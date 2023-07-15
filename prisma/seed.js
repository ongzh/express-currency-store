const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const currencies = [
    { code: "USD", isCrypto: false },
    { code: "SGD", isCrypto: false },
    { code: "EUR", isCrypto: false },
    { code: "BTC", isCrypto: true },
    { code: "DOGE", isCrypto: true },
    { code: "ETH", isCrypto: true },
  ];
  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { code: currency.code },
      update: currency,
      create: currency,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
