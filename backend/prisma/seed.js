import prismaClient from '../backend/src/services/prisma.js';
import bcrypt from 'bcryptjs';


(async function seed(){
try {
const pw = await bcrypt.hash('password123', 10);
// create manager
await prismaClient.user.upsert({ where: { email: 'manager@company.com' }, update: {}, create: { name: 'Manager', email: 'manager@company.com', password: pw, role: 'MANAGER' } });
// create staff
await prismaClient.user.upsert({ where: { email: 'staff@company.com' }, update: {}, create: { name: 'Staff', email: 'staff@company.com', password: pw, role: 'STAFF' } });


// create some stocks
const stocks = [
{ symbol: 'TATA', name: 'Tata Motors', industry: 'Auto', currentPrice: 500 },
{ symbol: 'RELI', name: 'Reliance Industries', industry: 'Energy', currentPrice: 2400 },
{ symbol: 'HDFC', name: 'HDFC Bank', industry: 'Finance', currentPrice: 1600 }
];


for (const s of stocks) {
await prismaClient.stock.upsert({ where: { symbol: s.symbol }, update: {}, create: s });
}


console.log('Seed complete');
process.exit(0);
} catch (err) {
console.error(err);
process.exit(1);
}
})();