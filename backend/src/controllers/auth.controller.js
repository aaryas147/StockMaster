import prisma from '../services/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
const { name, email, password, role } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });


try {
const existing = await prisma.user.findUnique({ where: { email } });
if (existing) return res.status(400).json({ message: 'Email already in use' });


const hashed = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ data: { name, email, password: hashed, role } });


const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const login = async (req, res) => {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Missing fields' });


try {
const user = await prisma.user.findUnique({ where: { email } });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });


const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(400).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};