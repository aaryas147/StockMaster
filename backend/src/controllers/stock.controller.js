import prisma from '../services/prisma.js';


export const listStocks = async (req, res) => {
const { q } = req.query;
try {
const where = q ? { OR: [{ symbol: { contains: q, mode: 'insensitive' } }, { name: { contains: q, mode: 'insensitive' } }] } : {};
const stocks = await prisma.stock.findMany({ where, take: 100 });
res.json(stocks);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const getStock = async (req, res) => {
const { id } = req.params;
try {
const stock = await prisma.stock.findUnique({ where: { id: Number(id) } });
res.json(stock);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};