import prisma from '../services/prisma.js';

// ======================== GET HOLDINGS ========================
export const getHoldings = async (req, res) => {
  try {
    const holdings = await prisma.holding.findMany({
      where: { userId: req.user.id },
      include: { stock: true },
    });

    res.json(holdings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== GET TRANSACTIONS ========================
export const getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: { stock: true },
    });

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== BUY STOCK ========================
export const buyStock = async (req, res) => {
  const { stockId, quantity, price } = req.body;

  if (!stockId || !quantity || !price) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const total = price * quantity;

    // Create transaction record
    const tx = await prisma.transaction.create({
      data: {
        userId: req.user.id,
        stockId,
        quantity,
        price,
        totalAmount: total,
        type: 'BUY',
      },
    });

    // Update or create holding
    const existing = await prisma.holding.findFirst({
      where: { userId: req.user.id, stockId },
    });

    if (existing) {
      const newQty = existing.quantity + quantity;
      const newTotalInvested = existing.totalInvested + total;
      const newAvg = newTotalInvested / newQty;

      await prisma.holding.update({
        where: { id: existing.id },
        data: {
          quantity: newQty,
          avgBuyPrice: newAvg,
          totalInvested: newTotalInvested,
        },
      });
    } else {
      await prisma.holding.create({
        data: {
          userId: req.user.id,
          stockId,
          quantity,
          avgBuyPrice: price,
          totalInvested: total,
        },
      });
    }

    res.json({ tx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== SELL STOCK ========================
export const sellStock = async (req, res) => {
  const { stockId, quantity, price } = req.body;

  if (!stockId || !quantity || !price) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const existing = await prisma.holding.findFirst({
      where: { userId: req.user.id, stockId },
    });

    if (!existing || existing.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough quantity' });
    }

    const total = price * quantity;

    const tx = await prisma.transaction.create({
      data: {
        userId: req.user.id,
        stockId,
        quantity,
        price,
        totalAmount: total,
        type: 'SELL',
      },
    });

    const newQty = existing.quantity - quantity;

    if (newQty === 0) {
      await prisma.holding.delete({ where: { id: existing.id } });
    } else {
      await prisma.holding.update({
        where: { id: existing.id },
        data: {
          quantity: newQty,
          totalInvested: existing.avgBuyPrice * newQty,
        },
      });
    }

    res.json({ tx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
