import { prisma } from '../src/lib/prisma';

async function main() {
  // Clear existing tasks
  await prisma.task.deleteMany();

  // Create initial task
  await prisma.task.create({
    data: {
      text: 'Prayer',
      x: 50,
      y: 50,
      quadrant: 'urgent-important',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });