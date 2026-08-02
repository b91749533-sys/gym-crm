import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Apex Gym CRM database...');

  // Create Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'alex.admin@apexfitness.com' },
    update: {},
    create: {
      email: 'alex.admin@apexfitness.com',
      passwordHash: '$2b$10$e8w61qW/x881...hash',
      name: 'Alex Vance',
      role: 'ADMIN',
      status: 'ACTIVE',
      phone: '+1 (555) 019-2834',
      bio: 'Founder & Managing Director of Apex Fitness Club.',
    },
  });

  // Create Membership Plan
  const plan = await prisma.membershipPlan.create({
    data: {
      name: 'Quarterly Athlete Plan',
      description: '3 months full gym access with complimentary sauna & body scans.',
      durationMonths: 3,
      price: 159.00,
      type: 'QUARTERLY',
      features: 'Full Gym Access, Sauna & Recovery Lounge, 1 InBody Scan / Month, Guest Pass x2',
      isPopular: true,
    },
  });

  console.log('Database seeded successfully!', { adminId: admin.id, planId: plan.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
